/**
 * Creates and configures a debug logging instance with namespace support, color selection, and formatting capabilities.
 *
 * @param {Object} debugOptions - An object containing configuration options and extension points for the debug instance.
 * @returns {Function} The configured debug instance function with attached utility methods and properties.
 */
function createDebugInstance(debugOptions) {
  // Attach utility methods and properties to the debug instance
  debugInstance.debug = debugInstance;
  debugInstance.default = debugInstance;
  debugInstance.coerce = coerceValue;
  debugInstance.disable = disableDebug;
  debugInstance.enable = enableDebug;
  debugInstance.enabled = isNamespaceEnabled;
  debugInstance.humanize = rJA(); // External dependency for humanizing durations
  debugInstance.destroy = deprecatedDestroy;

  // Extend debug instance with any custom properties from debugOptions
  Object.keys(debugOptions).forEach(optionKey => {
    debugInstance[optionKey] = debugOptions[optionKey];
  });

  debugInstance.names = [];
  debugInstance.skips = [];
  debugInstance.formatters = {};

  /**
   * Selects a color for a given namespace string using a hash function.
   * @param {string} namespace - The debug namespace.
   * @returns {number} The selected color index.
   */
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return debugInstance.colors[Math.abs(hash) % debugInstance.colors.length];
  }
  debugInstance.selectColor = selectColor;

  /**
   * The main debug instance factory function. Returns a logging function for a given namespace.
   * @param {string} namespace - The debug namespace.
   * @returns {Function} The logging function for the namespace.
   */
  function debugInstance(namespace) {
    let previousTimestamp;
    let manualEnabled = null;
    let lastNamespaces;
    let lastEnabled;

    /**
     * The actual logging function for the namespace.
     * @param {...any} args - Arguments to log.
     */
    function debugLogger(...args) {
      if (!debugLogger.enabled) return;
      const self = debugLogger;
      const currentTimestamp = Number(new Date());
      const diff = currentTimestamp - (previousTimestamp || currentTimestamp);
      self.diff = diff;
      self.prev = previousTimestamp;
      self.curr = currentTimestamp;
      previousTimestamp = currentTimestamp;

      // Coerce the first argument
      args[0] = debugInstance.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%createDebouncedFunction");
      }

      // Apply formatters for % tokens
      let argIndex = 0;
      args[0] = args[0].replace(/%([a-zA%])/g, (match, formatterKey) => {
        if (match === "%%") return "%";
        argIndex++;
        const formatter = debugInstance.formatters[formatterKey];
        if (typeof formatter === "function") {
          const value = args[argIndex];
          match = formatter.call(self, value);
          args.splice(argIndex, 1);
          argIndex--;
        }
        return match;
      });

      // Format arguments and log
      debugInstance.formatArgs.call(self, args);
      (self.log || debugInstance.log).apply(self, args);
    }

    debugLogger.namespace = namespace;
    debugLogger.useColors = debugInstance.useColors();
    debugLogger.color = debugInstance.selectColor(namespace);
    debugLogger.extend = extendNamespace;
    debugLogger.destroy = debugInstance.destroy;

    // Define the 'enabled' property with getter/setter for manual override
    Object.defineProperty(debugLogger, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (manualEnabled !== null) return manualEnabled;
        if (lastNamespaces !== debugInstance.namespaces) {
          lastNamespaces = debugInstance.namespaces;
          lastEnabled = debugInstance.enabled(namespace);
        }
        return lastEnabled;
      },
      set: value => {
        manualEnabled = value;
      }
    });

    // Call optional init hook
    if (typeof debugInstance.init === "function") {
      debugInstance.init(debugLogger);
    }

    return debugLogger;
  }

  /**
   * Extends the current namespace with a child namespace.
   * @param {string} childNamespace - The child namespace to append.
   * @param {string} [delimiter] - Optional delimiter (defaults to ':').
   * @returns {Function} The new debug logger for the extended namespace.
   */
  function extendNamespace(childNamespace, delimiter) {
    const newNamespace = this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + childNamespace;
    const extendedLogger = debugInstance(newNamespace);
    extendedLogger.log = this.log;
    return extendedLogger;
  }

  /**
   * Enables debug logging for the given namespaces string.
   * @param {string} namespaces - Comma or space separated list of namespaces.
   */
  function enableDebug(namespaces) {
    debugInstance.save(namespaces);
    debugInstance.namespaces = namespaces;
    debugInstance.names = [];
    debugInstance.skips = [];
    const splitNamespaces = (typeof namespaces === "string" ? namespaces : "")
      .trim()
      .replace(" ", ",")
      .split(",")
      .filter(Boolean);
    for (const ns of splitNamespaces) {
      if (ns[0] === "-") {
        debugInstance.skips.push(ns.slice(1));
      } else {
        debugInstance.names.push(ns);
      }
    }
  }

  /**
   * Checks if a namespace matches a pattern with wildcards.
   * @param {string} namespace - The namespace to test.
   * @param {string} pattern - The pattern to match (may include '*').
   * @returns {boolean} True if the namespace matches the pattern.
   */
  function namespaceMatchesPattern(namespace, pattern) {
    let nsIndex = 0;
    let patIndex = 0;
    let starIndex = -1;
    let nsTmpIndex = 0;
    while (nsIndex < namespace.length) {
      if (
        patIndex < pattern.length &&
        (pattern[patIndex] === namespace[nsIndex] || pattern[patIndex] === "*")
      ) {
        if (pattern[patIndex] === "*") {
          starIndex = patIndex;
          nsTmpIndex = nsIndex;
          patIndex++;
        } else {
          nsIndex++;
          patIndex++;
        }
      } else if (starIndex !== -1) {
        patIndex = starIndex + 1;
        nsTmpIndex++;
        nsIndex = nsTmpIndex;
      } else {
        return false;
      }
    }
    while (patIndex < pattern.length && pattern[patIndex] === "*") {
      patIndex++;
    }
    return patIndex === pattern.length;
  }

  /**
   * Disables all debug logging and returns the current namespaces string.
   * @returns {string} The previously enabled namespaces string.
   */
  function disableDebug() {
    const currentNamespaces = [
      ...debugInstance.names,
      ...debugInstance.skips.map(skipPattern => "-" + skipPattern)
    ].join(",");
    debugInstance.enable("");
    return currentNamespaces;
  }

  /**
   * Determines if a namespace is enabled for logging.
   * @param {string} namespace - The namespace to check.
   * @returns {boolean} True if enabled, false otherwise.
   */
  function isNamespaceEnabled(namespace) {
    for (const skipPattern of debugInstance.skips) {
      if (namespaceMatchesPattern(namespace, skipPattern)) return false;
    }
    for (const namePattern of debugInstance.names) {
      if (namespaceMatchesPattern(namespace, namePattern)) return true;
    }
    return false;
  }

  /**
   * Coerces a value for logging (e.g., Error objects to stack/message).
   * @param {any} value - The value to coerce.
   * @returns {any} The coerced value.
   */
  function coerceValue(value) {
    if (value instanceof Error) return value.stack || value.message;
    return value;
  }

  /**
   * Deprecated destroy method for debug instances.
   */
  function deprecatedDestroy() {
    console.warn(
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
  }

  // Initialize enabled namespaces from storage
  debugInstance.enable(debugInstance.load());
  return debugInstance;
}

module.exports = createDebugInstance;