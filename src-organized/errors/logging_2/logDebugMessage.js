/**
 * Logs a debug-level message using the application'createInteractionAccessor logging utility.
 *
 * @param {string} message - The message to be logged at debug verbosity.
 * @returns {void}
 */
function logDebugMessage(message) {
  // Log the message at DEBUG verbosity using the application'createInteractionAccessor logger
  Y36.trace(W36.LogVerbosity.DEBUG, J36, message);
}

module.exports = logDebugMessage;