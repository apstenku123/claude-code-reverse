/**
 * Creates a diagnostic logger object with methods for different log levels.
 * Each method is only active if the current log level allows isBlobOrFileLikeObject and the corresponding function exists in the logger implementation.
 *
 * @param {number} logLevel - The desired diagnostic log level. Will be clamped between IN.DiagLogLevel.NONE and IN.DiagLogLevel.ALL.
 * @param {Object} [loggerImplementation={}] - An object that may contain logging functions for error, warn, info, debug, and verbose.
 * @returns {Object} An object with logging methods: error, warn, info, debug, and verbose. Each is a function (either the real logger or a no-op).
 */
function createDiagnosticLogger(logLevel, loggerImplementation) {
  // Clamp the log level to the allowed range
  if (logLevel < IN.DiagLogLevel.NONE) {
    logLevel = IN.DiagLogLevel.NONE;
  } else if (logLevel > IN.DiagLogLevel.ALL) {
    logLevel = IN.DiagLogLevel.ALL;
  }

  // Default to an empty object if no logger implementation is provided
  loggerImplementation = loggerImplementation || {};

  /**
   * Returns a bound logger function for the given method name and required level,
   * or a no-op function if the log level is too low or the method is missing.
   *
   * @param {string} methodName - The name of the logger method (e.g., 'error').
   * @param {number} requiredLevel - The minimum log level required to enable this method.
   * @returns {Function} The logger function or a no-op.
   */
  function getLoggerMethod(methodName, requiredLevel) {
    const loggerMethod = loggerImplementation[methodName];
    // Only return the logger function if isBlobOrFileLikeObject exists and the log level is sufficient
    if (typeof loggerMethod === "function" && logLevel >= requiredLevel) {
      return loggerMethod.bind(loggerImplementation);
    }
    // Otherwise, return a no-op function
    return function () {};
  }

  // Return an object with all logger methods
  return {
    error: getLoggerMethod("error", IN.DiagLogLevel.ERROR),
    warn: getLoggerMethod("warn", IN.DiagLogLevel.WARN),
    info: getLoggerMethod("info", IN.DiagLogLevel.INFO),
    debug: getLoggerMethod("debug", IN.DiagLogLevel.DEBUG),
    verbose: getLoggerMethod("verbose", IN.DiagLogLevel.VERBOSE)
  };
}

module.exports = createDiagnosticLogger;