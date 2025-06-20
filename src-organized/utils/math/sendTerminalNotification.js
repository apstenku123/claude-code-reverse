/**
 * Sends a notification message to the terminal using the OSC 777 escape sequence.
 * This is typically used in terminal emulators that support notifications (e.g., iTerm2).
 *
 * @param {Object} options - The notification options.
 * @param {string} options.message - The notification message to display.
 * @param {string} [options.title] - The notification title. If not provided, a default title is used.
 * @returns {void}
 */
function sendTerminalNotification({
  message,
  title
}) {
  try {
    // Use the provided title or fall back to the default title (m0)
    const notificationTitle = title || m0;
    // Write the OSC 777 escape sequence to stdout to trigger a terminal notification
    process.stdout.write(`\x1B]777;notify;${notificationTitle};${message}\x07`);
  } catch (error) {
    // Silently ignore any errors (e.g., if process.stdout is unavailable)
  }
}

module.exports = sendTerminalNotification;