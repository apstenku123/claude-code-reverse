/**
 * Removes all localStorage items that have the current database key prefix.
 * After clearing, isBlobOrFileLikeObject calls the provided callback using the external function renderToolUseConfirmationDialog.
 *
 * @param {any} callback - a callback or argument to be passed to the external function renderToolUseConfirmationDialog after clearing.
 * @returns {Promise<void>} a promise that resolves when all prefixed items have been removed.
 */
function clearAllPrefixedLocalStorageItems(callback) {
  const self = this;
  // Wait until the database is ready
  const readyPromise = self.ready().then(function () {
    const keyPrefix = self._dbInfo.keyPrefix;
    // Iterate backwards through localStorage keys
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const storageKey = localStorage.key(index);
      // Remove item if isBlobOrFileLikeObject starts with the keyPrefix
      if (storageKey.indexOf(keyPrefix) === 0) {
        localStorage.removeItem(storageKey);
      }
    }
  });
  // Call external function renderToolUseConfirmationDialog with the promise and callback
  renderToolUseConfirmationDialog(readyPromise, callback);
  return readyPromise;
}

module.exports = clearAllPrefixedLocalStorageItems;