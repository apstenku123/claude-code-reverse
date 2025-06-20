/**
 * Sends a terminal notification message using ANSI escape codes.
 * If a title is provided, the message is prefixed with the title and a colon.
 *
 * @param {Object} params - The parameters for the notification.
 * @param {string} params.message - The main message to display in the notification.
 * @param {string} [params.title] - Optional title to prefix the message.
 * @returns {void}
 */
function sendTerminalNotification({ message, title }) {
  // Compose the notification content, prefixing with title if provided
  const notificationContent = title ? `${title}:
${message}` : message;
  try {
    // Write the ANSI escape sequence to stdout to trigger a terminal notification
    process.stdout.write(`\x1B]9;
${notificationContent}\x07`);
  } catch {
    // Silently ignore errors (e.g., if process.stdout is not available)
  }
}

module.exports = sendTerminalNotification;