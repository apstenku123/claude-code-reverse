/**
 * Creates a debug logger utility with enable/disable functionality and dynamic log methods.
 *
 * Depending on the DEBUG_BUILD flag, attaches console log methods (e.g., 'log', 'warn', etc.)
 * that only output when enabled. In production, these methods are no-ops.
 *
 * @returns {object} Logger object with enable/disable/isEnabled methods and dynamic log methods.
 */
function createDebugLogger() {
  // Indicates whether debug logging is enabled
  let isLoggingEnabled = false;

  // Logger object to be returned
  const logger = {
    /**
     * Enables debug logging.
     */
    enable: () => {
      isLoggingEnabled = true;
    },
    /**
     * Disables debug logging.
     */
    disable: () => {
      isLoggingEnabled = false;
    },
    /**
     * Checks if debug logging is enabled.
     * @returns {boolean}
     */
    isEnabled: () => isLoggingEnabled
  };

  // If in debug build, attach real logging methods
  if (fh2.DEBUG_BUILD) {
    $E1.forEach(logMethodName => {
      // Attach a method for each log type (e.g., log, warn, error)
      logger[logMethodName] = (...logArgs) => {
        if (isLoggingEnabled) {
          // Defer execution if needed, then log to the console
          withTemporaryConsoleOverrides(() => {
            NE1.GLOBAL_OBJ.console[logMethodName](`${vh2}[${logMethodName}]:`, ...logArgs);
          });
        }
      };
    });
  } else {
    // In production, attach no-op methods
    $E1.forEach(logMethodName => {
      logger[logMethodName] = () => {
        // No operation in production
        return;
      };
    });
  }

  return logger;
}

module.exports = createDebugLogger;