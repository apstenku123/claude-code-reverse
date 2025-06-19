/**
 * Creates and configures a debug logger utility with namespace support, color selection, and formatting.
 *
 * @param {Object} options - An object containing configuration options and extension methods for the logger.
 * @returns {Function} The configured debug logger function with attached utility methods and properties.
 */
function createDebugLogger(options) {
  /**
   * Selects a color for a given namespace string using a hash function.
   * @param {string} namespace - The namespace to select a color for.
   * @returns {string} The selected color.
   */
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return debugLogger.colors[Math.abs(hash) % debugLogger.colors.length];
  }

  /**
   * The main debug logger factory function.
   * @param {string} namespace - The namespace for the logger instance.
   * @returns {Function} The logger instance for the given namespace.
   */
  function debugLogger(namespace) {
    let previousTimestamp;
    let enabledOverride = null;
    let lastNamespaces;
    let lastEnabled;

    /**
     * The actual logging function for this namespace.
     * @param {...any} args - Arguments to log.
     */
    function loggerInstance(...args) {
      if (!loggerInstance.enabled) return;
      const self = loggerInstance;
      const currentTimestamp = Number(new Date());
      const diff = currentTimestamp - (previousTimestamp || currentTimestamp);
      self.diff = diff;
      self.prev = previousTimestamp;
      self.curr = currentTimestamp;
      previousTimestamp = currentTimestamp;

      // Coerce first argument
      args[0] = debugLogger.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%createDebouncedFunction");
      }

      // Format string substitutions
      let argIndex = 0;
      args[0] = args[0].replace(/%([a-zA%])/g, (match, formatChar) => {
        if (match === "%%") return "%";
        argIndex++;
        const formatter = debugLogger.formatters[formatChar];
        if (typeof formatter === "function") {
          const value = args[argIndex];
          match = formatter.call(self, value);
          args.splice(argIndex, 1);
          argIndex--;
        }
        return match;
      });

      debugLogger.formatArgs.call(self, args);
      (self.log || debugLogger.log).apply(self, args);
    }

    loggerInstance.namespace = namespace;
    loggerInstance.useColors = debugLogger.useColors();
    loggerInstance.color = debugLogger.selectColor(namespace);
    loggerInstance.extend = extendNamespace;
    loggerInstance.destroy = debugLogger.destroy;

    // Define the 'enabled' property with getter/setter
    Object.defineProperty(loggerInstance, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enabledOverride !== null) return enabledOverride;
        if (lastNamespaces !== debugLogger.namespaces) {
          lastNamespaces = debugLogger.namespaces;
          lastEnabled = debugLogger.enabled(namespace);
        }
        return lastEnabled;
      },
      set: value => {
        enabledOverride = value;
      }
    });

    // Call init hook if present
    if (typeof debugLogger.init === "function") {
      debugLogger.init(loggerInstance);
    }

    return loggerInstance;
  }

  /**
   * Extends the current namespace with a child namespace.
   * @param {string} childNamespace - The child namespace to append.
   * @param {string} [delimiter=":"] - Optional delimiter between namespaces.
   * @returns {Function} The new logger instance for the extended namespace.
   */
  function extendNamespace(childNamespace, delimiter) {
    const newNamespace = this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + childNamespace;
    const childLogger = debugLogger(newNamespace);
    childLogger.log = this.log;
    return childLogger;
  }

  /**
   * Enables debug logging for the given namespaces string.
   * @param {string} namespaces - Comma- or space-separated list of namespaces to enable.
   */
  function enableNamespaces(namespaces) {
    debugLogger.save(namespaces);
    debugLogger.namespaces = namespaces;
    debugLogger.names = [];
    debugLogger.skips = [];
    const splitNamespaces = (typeof namespaces === "string" ? namespaces : "")
      .trim()
      .replace(" ", ",")
      .split(",")
      .filter(Boolean);
    for (const ns of splitNamespaces) {
      if (ns[0] === "-") {
        debugLogger.skips.push(ns.slice(1));
      } else {
        debugLogger.names.push(ns);
      }
    }
  }

  /**
   * Checks if a namespace matches a pattern with wildcards.
   * @param {string} namespace - The namespace to check.
   * @param {string} pattern - The pattern to match against (may contain '*').
   * @returns {boolean} True if the namespace matches the pattern.
   */
  function matchesNamespacePattern(namespace, pattern) {
    let nsIndex = 0;
    let patIndex = 0;
    let starIndex = -1;
    let matchIndex = 0;
    while (nsIndex < namespace.length) {
      if (
        patIndex < pattern.length &&
        (pattern[patIndex] === namespace[nsIndex] || pattern[patIndex] === "*")
      ) {
        if (pattern[patIndex] === "*") {
          starIndex = patIndex;
          matchIndex = nsIndex;
          patIndex++;
        } else {
          nsIndex++;
          patIndex++;
        }
      } else if (starIndex !== -1) {
        patIndex = starIndex + 1;
        matchIndex++;
        nsIndex = matchIndex;
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
   * Disables all debug logging and returns the previously enabled namespaces.
   * @returns {string} The previously enabled namespaces.
   */
  function disableNamespaces() {
    const previousNamespaces = [...debugLogger.names, ...debugLogger.skips.map(ns => "-" + ns)].join(",");
    debugLogger.enable("");
    return previousNamespaces;
  }

  /**
   * Determines if a namespace is enabled for logging.
   * @param {string} namespace - The namespace to check.
   * @returns {boolean} True if enabled, false otherwise.
   */
  function isNamespaceEnabled(namespace) {
    for (const skipPattern of debugLogger.skips) {
      if (matchesNamespacePattern(namespace, skipPattern)) return false;
    }
    for (const namePattern of debugLogger.names) {
      if (matchesNamespacePattern(namespace, namePattern)) return true;
    }
    return false;
  }

  /**
   * Coerces a value for logging, handling Error objects specially.
   * @param {any} value - The value to coerce.
   * @returns {any} The coerced value.
   */
  function coerceLogValue(value) {
    if (value instanceof Error) return value.stack || value.message;
    return value;
  }

  /**
   * Deprecated destroy method for logger instances.
   */
  function deprecatedDestroy() {
    console.warn(
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
  }

  // Attach methods and properties to the main debugLogger function
  debugLogger.debug = debugLogger;
  debugLogger.default = debugLogger;
  debugLogger.coerce = coerceLogValue;
  debugLogger.disable = disableNamespaces;
  debugLogger.enable = enableNamespaces;
  debugLogger.enabled = isNamespaceEnabled;
  debugLogger.humanize = rJA(); // Assumes rJA is a function returning a humanizer
  debugLogger.destroy = deprecatedDestroy;
  debugLogger.names = [];
  debugLogger.skips = [];
  debugLogger.formatters = {};
  debugLogger.selectColor = selectColor;

  // Copy any additional properties from options
  Object.keys(options).forEach(key => {
    debugLogger[key] = options[key];
  });

  // Enable namespaces from persisted storage
  debugLogger.enable(debugLogger.load());

  return debugLogger;
}

module.exports = createDebugLogger;