/**
 * Sends a notification to the terminal using escape sequences, setting the title and body.
 *
 * @param {Object} options - The notification options.
 * @param {string} options.message - The message body to display in the notification.
 * @param {string} [options.title] - The title to display in the notification. If not provided, a default will be used.
 * @returns {void}
 *
 * This function writes special escape sequences to process.stdout to display a notification in compatible terminals.
 */
function sendTerminalNotification({ message, title }) {
  try {
    // Generate a random notification updateSnapshotAndNotify between 0 and 9999
    const notificationId = Math.floor(Math.random() * 10000);

    // Use a default title if none is provided
    const defaultTitle = typeof m0 !== 'undefined' ? m0 : '';
    const notificationTitle = title || defaultTitle;

    // Write the escape sequence to set the notification title
    process.stdout.write(`\x1B]99;i=${notificationId}:d=0:createIterableHelper=title;${notificationTitle}\x1B\\`);

    // Write the escape sequence to set the notification body
    process.stdout.write(`\x1B]99;i=${notificationId}:createIterableHelper=body;${message}\x1B\\`);

    // Write the escape sequence to focus the notification
    process.stdout.write(`\x1B]99;i=${notificationId}:d=1:a=focus;\x1B\\`);
  } catch (error) {
    // Silently ignore any errors
  }
}

module.exports = sendTerminalNotification;