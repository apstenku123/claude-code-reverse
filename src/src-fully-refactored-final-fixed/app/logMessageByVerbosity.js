/**
 * Logs a message to the appropriate logger method based on the provided verbosity level.
 * If the verbosity level is below the minimum threshold, no logging occurs.
 *
 * @param {number} verbosityLevel - The verbosity level of the message (should correspond to dL.LogVerbosity enum).
 * @param {...any} messageArguments - The arguments to be passed to the logger method (e.g., message, metadata).
 * @returns {void}
 */
function logMessageByVerbosity(verbosityLevel, ...messageArguments) {
  // Check if the verbosity level meets the minimum threshold
  if (verbosityLevel >= Mg) {
    let loggerMethod;
    // Select the appropriate logger method based on verbosity
    switch (verbosityLevel) {
      case dL.LogVerbosity.DEBUG:
        loggerMethod = U_.debug;
        break;
      case dL.LogVerbosity.INFO:
        loggerMethod = U_.info;
        break;
      case dL.LogVerbosity.ERROR:
        loggerMethod = U_.error;
        break;
      default:
        loggerMethod = undefined;
    }
    // Fallback to error logger if no method matched
    if (!loggerMethod) {
      loggerMethod = U_.error;
    }
    // Bind the logger context and log the message
    if (loggerMethod) {
      loggerMethod.bind(U_)(...messageArguments);
    }
  }
}

module.exports = logMessageByVerbosity;