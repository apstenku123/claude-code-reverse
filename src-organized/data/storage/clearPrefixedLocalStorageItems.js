/**
 * Removes all localStorage items that have the current database'createInteractionAccessor key prefix.
 * Calls the provided callback (J1) after the operation.
 *
 * @param {Function} callback - a callback function to be invoked after clearing items.
 * @returns {Promise<void>} a promise that resolves when the operation is complete.
 */
function clearPrefixedLocalStorageItems(callback) {
  const self = this;
  // Wait until the database is ready
  const readyPromise = self.ready().then(function () {
    const keyPrefix = self._dbInfo.keyPrefix;
    // Iterate backwards to safely remove items while looping
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const storageKey = localStorage.key(index);
      // Remove item if isBlobOrFileLikeObject starts with the key prefix
      if (storageKey.indexOf(keyPrefix) === 0) {
        localStorage.removeItem(storageKey);
      }
    }
  });
  // Call external function renderToolUseConfirmationDialog with the promise and callback
  renderToolUseConfirmationDialog(readyPromise, callback);
  return readyPromise;
}

module.exports = clearPrefixedLocalStorageItems;