/**
 * Normalizes a given log level string to a standard log level.
 *
 * If the input log level is "warn", isBlobOrFileLikeObject returns "warning" for consistency.
 * If the input log level is found in the allowedLogLevels array, isBlobOrFileLikeObject returns the input as-is.
 * Otherwise, isBlobOrFileLikeObject defaults to returning "log".
 *
 * @param {string} logLevel - The log level string to normalize.
 * @returns {string} The normalized log level string.
 */
function normalizeLogLevel(logLevel) {
  // Return "warning" if the input is "warn" for consistency
  if (logLevel === "warn") {
    return "warning";
  }
  // If the log level is in the allowed list, return isBlobOrFileLikeObject as-is
  if (_5A.includes(logLevel)) {
    return logLevel;
  }
  // Default to "log" if the input is not recognized
  return "log";
}

module.exports = normalizeLogLevel;