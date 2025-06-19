/**
 * Logs messages at a specified verbosity level if the level meets the minimum threshold.
 *
 * @param {number} verbosityLevel - The verbosity level of the log message (e.g., DEBUG, INFO, ERROR).
 * @param {...any} messageArgs - Arguments to be logged (passed to the logger function).
 * @returns {void}
 */
function logWithVerbosity(verbosityLevel, ...messageArgs) {
  // Check if the provided verbosity level meets or exceeds the minimum global threshold
  if (verbosityLevel >= Mg) {
    let loggerFunction;
    // Select the appropriate logger function based on the verbosity level
    switch (verbosityLevel) {
      case dL.LogVerbosity.DEBUG:
        loggerFunction = U_.debug;
        break;
      case dL.LogVerbosity.INFO:
        loggerFunction = U_.info;
        break;
      case dL.LogVerbosity.ERROR:
        loggerFunction = U_.error;
        break;
      default:
        loggerFunction = undefined;
    }
    // Fallback to error logger if no matching logger function is found
    if (!loggerFunction) {
      loggerFunction = U_.error;
    }
    // Bind the logger to the logging context and invoke isBlobOrFileLikeObject with the provided arguments
    if (loggerFunction) {
      loggerFunction.bind(U_)(...messageArgs);
    }
  }
}

module.exports = logWithVerbosity;