/**
 * Retrieves the number of keys from the current context and triggers a notification with the result.
 *
 * @param {any} notificationData - Data to be passed to the notification handler renderToolUseConfirmationDialog.
 * @returns {Promise<number>} a promise that resolves to the number of keys.
 */
function getKeyCountAndNotify(notificationData) {
  const context = this;

  // Fetch the keys and get their count
  const keyCountPromise = context.keys().then(function (keysArray) {
    return keysArray.length;
  });

  // Notify with the promise and the provided data
  renderToolUseConfirmationDialog(keyCountPromise, notificationData);

  // Return the promise for further chaining
  return keyCountPromise;
}

module.exports = getKeyCountAndNotify;