/**
 * Logs a debug message related to the PI6 accessor using the uI6 tracing utility.
 *
 * @param {string} debugMessage - The message to be logged at DEBUG verbosity for PI6.
 * @returns {void}
 */
function logDebugMessageForPI6(debugMessage) {
  // Log the debug message for PI6 using the uI6 tracing utility
  uI6.trace(ny0.LogVerbosity.DEBUG, pI6, debugMessage);
}

module.exports = logDebugMessageForPI6;