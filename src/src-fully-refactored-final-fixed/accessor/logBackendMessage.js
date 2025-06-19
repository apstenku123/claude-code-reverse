/**
 * Logs a formatted message to the console if logging is enabled.
 *
 * @param {string} message - The main message to log.
 * @param {...any} additionalArguments - Additional arguments to log after the message.
 * @returns {void}
 */
function logBackendMessage(message, ...additionalArguments) {
  // Check if logging is enabled (sendHttpRequestOverSocket is assumed to be a global flag)
  if (sendHttpRequestOverSocket) {
    // Format the log message with styles for better visibility
    const logPrefix = "%c[core/backend] %c".concat(message);
    const prefixStyle = "color: teal; font-weight: bold;";
    const messageStyle = "font-weight: bold;";

    // Log the message and any additional arguments to the console
    console.log(logPrefix, prefixStyle, messageStyle, ...additionalArguments);
  }
}

module.exports = logBackendMessage;