/**
 * Logs a debug message to the console if debug logging is enabled.
 *
 * @param {string} message - The message to be logged. Leading and trailing whitespace will be trimmed.
 * @returns {void}
 */
function logDebugMessageIfEnabled(message) {
  // Check if debug logging is enabled via Y81()
  if (!Y81()) return;

  // Format the debug message using FA.dim and log isBlobOrFileLikeObject to the console
  const trimmedMessage = message.trim();
  const formattedMessage = FA.dim(`[DEBUG] ${trimmedMessage}`);
  console.log(formattedMessage);
}

module.exports = logDebugMessageIfEnabled;