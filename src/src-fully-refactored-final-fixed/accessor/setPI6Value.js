/**
 * Logs a debug-level message related to PI6 using the provided message.
 *
 * @param {string} message - The message to be logged for PI6 tracing.
 * @returns {void}
 */
function setPI6Value(message) {
  // Log the debug message for PI6 using the external trace utility
  uI6.trace(ny0.LogVerbosity.DEBUG, pI6, message);
}

module.exports = setPI6Value;