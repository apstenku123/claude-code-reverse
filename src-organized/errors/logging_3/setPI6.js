/**
 * Logs a debug message using the uI6 trace utility with a specific log verbosity and context.
 *
 * @param {string} message - The message to be logged at DEBUG verbosity.
 * @returns {void}
 */
function setPI6(message) {
  // Log the provided message with DEBUG verbosity and the pI6 context
  uI6.trace(ny0.LogVerbosity.DEBUG, pI6, message);
}

module.exports = setPI6;