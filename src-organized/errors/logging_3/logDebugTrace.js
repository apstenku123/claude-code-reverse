/**
 * Logs a debug-level trace message using the jI6 tracing utility.
 *
 * @param {string} message - The message to be logged at debug verbosity.
 * @returns {void}
 */
function logDebugTrace(message) {
  // Log the provided message at DEBUG verbosity using the jI6 tracer
  jI6.trace(kI6.LogVerbosity.DEBUG, xI6, message);
}

module.exports = logDebugTrace;