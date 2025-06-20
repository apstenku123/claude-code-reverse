/**
 * Retrieves the corresponding log level constant for a given log level string.
 * If the provided log level string is unknown, logs a warning and returns the default INFO log level.
 *
 * @param {string} logLevelString - The log level as a string (case-insensitive).
 * @returns {number} The corresponding log level constant, or the INFO log level if unknown.
 */
function getLogLevelFromString(logLevelString) {
  // Return undefined if input is null or undefined
  if (logLevelString == null) return;

  // Convert the input string to uppercase to ensure case-insensitive matching
  const normalizedLogLevel = logLevelString.toUpperCase();

  // Look up the corresponding log level constant from the WU0 mapping
  const logLevelConstant = WU0[normalizedLogLevel];

  // If the log level is not recognized, log a warning and return the default INFO level
  if (logLevelConstant == null) {
    DN.diag.warn(
      `Unknown log level "${logLevelString}", expected one of ${Object.keys(WU0)}, using default`
    );
    return DN.DiagLogLevel.INFO;
  }

  // Return the found log level constant
  return logLevelConstant;
}

module.exports = getLogLevelFromString;