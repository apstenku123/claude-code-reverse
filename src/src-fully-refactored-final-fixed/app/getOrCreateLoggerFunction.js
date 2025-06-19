/**
 * Retrieves or creates a logger function for a given key, optionally namespaced.
 * Caches the logger for future calls. Handles environment checks and logger initialization.
 *
 * @param {string} loggerKey - The unique key identifying the logger (may be namespaced).
 * @param {object} [namespaceConfig] - Optional configuration object containing an instance with a namespace property.
 * @returns {Function} The logger function associated with the given key, or a placeholder if unavailable.
 */
function getOrCreateLoggerFunction(loggerKey, namespaceConfig) {
  // Check if the required environment variable is enabled
  if (!st.env[U8.env.nodeEnables]) {
    return U8.placeholder;
  }

  // If no logger key is provided, return the placeholder
  if (!loggerKey) {
    return U8.placeholder;
  }

  // If a namespace config is provided, prepend its namespace to the logger key
  if (namespaceConfig) {
    loggerKey = `${namespaceConfig.instance.namespace}:${loggerKey}`;
  }

  // Attempt to retrieve a cached logger instance
  const cachedLoggerInstance = ma1.get(loggerKey);
  if (cachedLoggerInstance) {
    return cachedLoggerInstance.func;
  }

  // Ensure the global logger context is initialized
  if (tX === null) {
    return U8.placeholder;
  } else if (tX === void 0) {
    tX = ha1();
  }

  // Create a new logger instance with context tracking
  const loggerInstance = (() => {
    let lastLoggerContext = void 0;
    return new gC1(loggerKey, (message, ...args) => {
      // If the logger context has changed, re-initialize if necessary
      if (lastLoggerContext !== tX) {
        if (tX === null) {
          return;
        } else if (tX === void 0) {
          tX = ha1();
        }
        lastLoggerContext = tX;
      }
      // Log the message if the logger context is valid
      tX === null || tX === void 0 || tX.log(loggerKey, message, ...args);
    });
  })();

  // Cache the new logger instance for future use
  ma1.set(loggerKey, loggerInstance);
  return loggerInstance.func;
}

module.exports = getOrCreateLoggerFunction;