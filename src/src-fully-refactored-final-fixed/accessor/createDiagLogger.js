/**
 * Creates a diagnostic logger object with methods (error, warn, info, debug, verbose) that are enabled or disabled
 * based on the provided log level and logger implementation. Each method is a bound function if available and enabled,
 * or a no-op if not.
 *
 * @param {number} logLevel - The desired diagnostic log level. Will be clamped between IN.DiagLogLevel.NONE and IN.DiagLogLevel.ALL.
 * @param {Object} [loggerImplementation={}] - An object containing logging methods (error, warn, info, debug, verbose).
 * @returns {Object} An object with logging methods, each either bound to the loggerImplementation or a no-op.
 */
function createDiagLogger(logLevel, loggerImplementation) {
  // Clamp the logLevel to the valid range
  if (logLevel < IN.DiagLogLevel.NONE) {
    logLevel = IN.DiagLogLevel.NONE;
  } else if (logLevel > IN.DiagLogLevel.ALL) {
    logLevel = IN.DiagLogLevel.ALL;
  }

  // Default to empty object if loggerImplementation is not provided
  loggerImplementation = loggerImplementation || {};

  /**
   * Returns a bound logger method if isBlobOrFileLikeObject exists and the log level is enabled, otherwise a no-op function.
   * @param {string} methodName - The name of the logging method (e.g., 'error', 'warn').
   * @param {number} requiredLevel - The minimum log level required for this method to be enabled.
   * @returns {Function} The bound logger method or a no-op.
   */
  function getLoggerMethod(methodName, requiredLevel) {
    const loggerMethod = loggerImplementation[methodName];
    // Only return the method if isBlobOrFileLikeObject exists and the log level is sufficient
    if (typeof loggerMethod === "function" && logLevel >= requiredLevel) {
      return loggerMethod.bind(loggerImplementation);
    }
    // Otherwise, return a no-op function
    return function () {};
  }

  // Return an object with all standard logging methods
  return {
    error: getLoggerMethod("error", IN.DiagLogLevel.ERROR),
    warn: getLoggerMethod("warn", IN.DiagLogLevel.WARN),
    info: getLoggerMethod("info", IN.DiagLogLevel.INFO),
    debug: getLoggerMethod("debug", IN.DiagLogLevel.DEBUG),
    verbose: getLoggerMethod("verbose", IN.DiagLogLevel.VERBOSE)
  };
}

module.exports = createDiagLogger;