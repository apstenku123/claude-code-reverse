/**
 * Removes all localStorage entries that start with the instance'createInteractionAccessor key prefix.
 * Calls the external function renderToolUseConfirmationDialog with the ready promise and an optional callback or argument.
 *
 * @param {any} callbackOrArg - Optional argument passed to the external renderToolUseConfirmationDialog function.
 * @returns {Promise<void>} Resolves when all matching localStorage keys have been removed.
 */
function clearPrefixedLocalStorageKeys(callbackOrArg) {
  const instance = this;
  // Wait until the instance is ready
  const readyPromise = instance.ready().then(function () {
    const keyPrefix = instance._dbInfo.keyPrefix;
    // Iterate backwards through localStorage keys
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const storageKey = localStorage.key(index);
      // Remove the item if isBlobOrFileLikeObject starts with the key prefix
      if (storageKey.indexOf(keyPrefix) === 0) {
        localStorage.removeItem(storageKey);
      }
    }
  });
  // Call external function renderToolUseConfirmationDialog with the ready promise and the provided argument
  renderToolUseConfirmationDialog(readyPromise, callbackOrArg);
  return readyPromise;
}

module.exports = clearPrefixedLocalStorageKeys;