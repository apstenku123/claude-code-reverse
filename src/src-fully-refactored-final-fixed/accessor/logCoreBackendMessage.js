/**
 * Logs a formatted message to the console under the [core/backend] tag if logging is enabled.
 *
 * @param {string} message - The main message to log.
 * @param {...any} additionalArgs - Additional arguments to log after the main message.
 * @returns {void}
 */
function logCoreBackendMessage(message, ...additionalArgs) {
  // Check if logging is enabled via the global 'sendHttpRequestOverSocket' flag
  if (sendHttpRequestOverSocket) {
    // Format the message with styling for the [core/backend] tag and the main message
    const formattedMessage = `%c[core/backend] %c${message}`;
    const coreStyle = "color: teal; font-weight: bold;";
    const messageStyle = "font-weight: bold;";

    // Log the formatted message and any additional arguments to the console
    console.log(formattedMessage, coreStyle, messageStyle, ...additionalArgs);
  }
}

module.exports = logCoreBackendMessage;