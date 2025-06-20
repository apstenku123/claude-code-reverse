/**
 * Logs a debug-level message using the application'createInteractionAccessor tracing utility.
 *
 * @param {string} message - The message to be logged at debug verbosity.
 * @returns {void}
 */
function logDebugMessage(message) {
  // Log the provided message at DEBUG verbosity using the trace utility
  i46.trace(n46.LogVerbosity.DEBUG, r46, message);
}

module.exports = logDebugMessage;