/**
 * Removes all localStorage entries that start with the current database key prefix.
 * Calls the provided callback (if any) after the operation is scheduled.
 *
 * @param {any} callback - Optional callback or argument to pass to the external renderToolUseConfirmationDialog function.
 * @returns {Promise<void>} Resolves when all matching localStorage keys have been removed.
 */
function clearAllPrefixedLocalStorageKeys(callback) {
  const self = this;
  // Wait until the instance is ready before proceeding
  const readyPromise = self.ready().then(function () {
    const keyPrefix = self._dbInfo.keyPrefix;
    // Iterate backwards through localStorage keys
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const storageKey = localStorage.key(index);
      // Remove the key if isBlobOrFileLikeObject starts with the database key prefix
      if (storageKey.indexOf(keyPrefix) === 0) {
        localStorage.removeItem(storageKey);
      }
    }
  });
  // Call the external renderToolUseConfirmationDialog function with the promise and callback/argument
  renderToolUseConfirmationDialog(readyPromise, callback);
  return readyPromise;
}

module.exports = clearAllPrefixedLocalStorageKeys;