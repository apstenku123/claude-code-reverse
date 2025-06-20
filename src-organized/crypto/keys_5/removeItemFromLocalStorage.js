/**
 * Removes an item from localStorage using a processed key and handles a callback.
 *
 * @param {string} key - The key of the item to remove (will be processed by the keyProcessor).
 * @param {Function} [callback] - Optional callback to execute after removal.
 * @returns {Promise<void>} a promise that resolves when the item has been removed.
 */
function removeItemFromLocalStorage(key, callback) {
  const self = this;
  // Process the key using the external key processor function
  const processedKey = createDebouncedFunction(key);

  // Wait until the instance is ready, then remove the item from localStorage
  const removalPromise = self.ready().then(function () {
    const dbInfo = self._dbInfo;
    // Remove the item from localStorage using the prefixed key
    localStorage.removeItem(dbInfo.keyPrefix + processedKey);
  });

  // Handle the optional callback using the external callback handler
  renderToolUseConfirmationDialog(removalPromise, callback);

  // Return the promise so callers can await completion
  return removalPromise;
}

module.exports = removeItemFromLocalStorage;