/**
 * Writes a notification message to the terminal using an OSC 9 escape sequence.
 * If a title is provided, isBlobOrFileLikeObject prefixes the message with the title followed by a colon and newline.
 *
 * @param {Object} options - The options for the notification.
 * @param {string} options.message - The main notification message to display.
 * @param {string} [options.title] - An optional title to prefix the message.
 * @returns {void} This function does not return a value.
 */
function writeTerminalNotification({
  message,
  title
}) {
  // Combine title and message if title is provided, otherwise use message only
  const notificationText = title ? `${title}:
${message}` : message;
  try {
    // Write the OSC 9 escape sequence to stdout to trigger a terminal notification
    process.stdout.write(`\x1B]9;

${notificationText}\x07`);
  } catch {
    // Silently ignore any errors (e.g., if process.stdout is not available)
  }
}

module.exports = writeTerminalNotification;