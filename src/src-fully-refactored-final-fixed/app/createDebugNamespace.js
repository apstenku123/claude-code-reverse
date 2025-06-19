/**
 * Creates and configures a debug logging namespace with color selection, formatting, and enable/disable logic.
 *
 * @param {Object} debugConfig - An object containing configuration and utility functions for the debug module.
 * @returns {Function} The main debug function, augmented with static methods and properties.
 */
function createDebugNamespace(debugConfig) {
  // Attach core methods and properties to the main debug function
  debugFunction.debug = debugFunction;
  debugFunction.default = debugFunction;
  debugFunction.coerce = coerceValue;
  debugFunction.disable = disableDebug;
  debugFunction.enable = enableDebug;
  debugFunction.enabled = isNamespaceEnabled;
  debugFunction.humanize = rJA(); // External dependency for humanizing durations
  debugFunction.destroy = deprecatedDestroy;

  // Copy all properties from the config object to the debug function
  Object.keys(debugConfig).forEach((key) => {
    debugFunction[key] = debugConfig[key];
  });

  // Initialize namespace and skip lists, and formatter map
  debugFunction.names = [];
  debugFunction.skips = [];
  debugFunction.formatters = {};

  /**
   * Selects a color for a given namespace string using a hash function.
   * @param {string} namespace
   * @returns {string} Color code
   */
  function selectColor(namespace) {
    let hash = 0;
    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return debugFunction.colors[Math.abs(hash) % debugFunction.colors.length];
  }
  debugFunction.selectColor = selectColor;

  /**
   * The main debug function for a specific namespace.
   * @param {string} namespace - The debug namespace
   * @returns {Function} The debug logging function for this namespace
   */
  function debugFunction(namespace) {
    let lastTimestamp;
    let enabledOverride = null;
    let lastNamespaces;
    let lastEnabled;

    /**
     * The actual logging function for this namespace.
     * @param {...any} args
     */
    function logFunction(...args) {
      if (!logFunction.enabled) return;
      const self = logFunction;
      const currentTimestamp = Number(new Date());
      const diff = currentTimestamp - (lastTimestamp || currentTimestamp);
      self.diff = diff;
      self.prev = lastTimestamp;
      self.curr = currentTimestamp;
      lastTimestamp = currentTimestamp;

      // Coerce first argument and prepend format if not a string
      args[0] = debugFunction.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%createDebouncedFunction");
      }

      // Format string substitutions
      let argIndex = 0;
      args[0] = args[0].replace(/%([a-zA%])/g, (match, formatChar) => {
        if (match === "%%") return "%";
        argIndex++;
        const formatter = debugFunction.formatters[formatChar];
        if (typeof formatter === "function") {
          const value = args[argIndex];
          match = formatter.call(self, value);
          args.splice(argIndex, 1);
          argIndex--;
        }
        return match;
      });

      // Call the formatArgs and log methods
      debugFunction.formatArgs.call(self, args);
      (self.log || debugFunction.log).apply(self, args);
    }

    logFunction.namespace = namespace;
    logFunction.useColors = debugFunction.useColors();
    logFunction.color = debugFunction.selectColor(namespace);
    logFunction.extend = extendNamespace;
    logFunction.destroy = debugFunction.destroy;

    // Define the 'enabled' property with getter/setter
    Object.defineProperty(logFunction, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enabledOverride !== null) return enabledOverride;
        if (lastNamespaces !== debugFunction.namespaces) {
          lastNamespaces = debugFunction.namespaces;
          lastEnabled = debugFunction.enabled(namespace);
        }
        return lastEnabled;
      },
      set: (value) => {
        enabledOverride = value;
      }
    });

    // Call init hook if present
    if (typeof debugFunction.init === "function") {
      debugFunction.init(logFunction);
    }

    return logFunction;
  }

  /**
   * Extends the current namespace with a sub-namespace.
   * @param {string} subNamespace - The sub-namespace to append
   * @param {string} [delimiter=":"] - Optional delimiter
   * @returns {Function} The extended debug function
   */
  function extendNamespace(subNamespace, delimiter) {
    const newNamespace = this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + subNamespace;
    const extendedDebug = debugFunction(newNamespace);
    extendedDebug.log = this.log;
    return extendedDebug;
  }

  /**
   * Enables debug logging for the given namespaces string.
   * @param {string} namespaces
   */
  function enableDebug(namespaces) {
    debugFunction.save(namespaces);
    debugFunction.namespaces = namespaces;
    debugFunction.names = [];
    debugFunction.skips = [];
    const splitNamespaces = (typeof namespaces === "string" ? namespaces : "")
      .trim()
      .replace(" ", ",")
      .split(",")
      .filter(Boolean);
    for (const ns of splitNamespaces) {
      if (ns[0] === "-") {
        debugFunction.skips.push(ns.slice(1));
      } else {
        debugFunction.names.push(ns);
      }
    }
  }

  /**
   * Checks if a namespace matches a pattern with wildcards.
   * @param {string} namespace
   * @param {string} pattern
   * @returns {boolean}
   */
  function matchesPattern(namespace, pattern) {
    let nsIndex = 0;
    let patIndex = 0;
    let starIndex = -1;
    let nsTmpIndex = 0;
    while (nsIndex < namespace.length) {
      if (patIndex < pattern.length && (pattern[patIndex] === namespace[nsIndex] || pattern[patIndex] === "*")) {
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
   * Disables all debug logging and returns the previous namespaces string.
   * @returns {string} The previous namespaces string
   */
  function disableDebug() {
    const previousNamespaces = [...debugFunction.names, ...debugFunction.skips.map((ns) => "-" + ns)].join(",");
    debugFunction.enable("");
    return previousNamespaces;
  }

  /**
   * Determines if a namespace is enabled for debug logging.
   * @param {string} namespace
   * @returns {boolean}
   */
  function isNamespaceEnabled(namespace) {
    for (const skipPattern of debugFunction.skips) {
      if (matchesPattern(namespace, skipPattern)) return false;
    }
    for (const namePattern of debugFunction.names) {
      if (matchesPattern(namespace, namePattern)) return true;
    }
    return false;
  }

  /**
   * Coerces a value for logging, converting Errors to their stack/message.
   * @param {any} value
   * @returns {any}
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

  // Initialize debug with loaded namespaces
  debugFunction.enable(debugFunction.load());
  return debugFunction;
}

module.exports = createDebugNamespace;