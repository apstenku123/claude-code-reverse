/**
 * Logs a debug-level trace message using the application'createInteractionAccessor logging utility.
 *
 * @param {any} message - The message or object to be logged at debug verbosity.
 * @returns {void} This function does not return a value.
 */
function logDebugTrace(message) {
  // Log the provided message at DEBUG verbosity using the application'createInteractionAccessor logger
  Y36.trace(W36.LogVerbosity.DEBUG, J36, message);
}

module.exports = logDebugTrace;