/**
 * Notifies the connected IDE that the current process is connected by sending a notification
 * with the process updateSnapshotAndNotify(pid).
 *
 * @async
 * @function notifyIdeConnected
 * @param {Object} notificationClient - An object that provides a `notification` method for sending notifications.
 * @returns {Promise<void>} Resolves when the notification has been sent.
 */
async function notifyIdeConnected(notificationClient) {
  // Send a notification to the IDE indicating that the process is connected, including the current process updateSnapshotAndNotify
  await notificationClient.notification({
    method: "ide_connected",
    params: {
      pid: process.pid
    }
  });
}

module.exports = notifyIdeConnected;