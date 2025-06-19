/**
 * Removes an item from localStorage asynchronously after ensuring the database is ready.
 *
 * @param {string} itemKey - The key of the item to remove from localStorage.
 * @param {any} callback - Optional callback to be invoked after removal.
 * @returns {Promise<void>} a promise that resolves when the item has been removed.
 */
function removeItemFromLocalStorageAsync(itemKey, callback) {
  const self = this;
  // Normalize or encode the item key using the external createDebouncedFunction function
  const normalizedKey = createDebouncedFunction(itemKey);
  // Wait for the database to be ready before removing the item
  const removalPromise = self.ready().then(function () {
    const dbInfo = self._dbInfo;
    // Remove the item from localStorage using the key prefix and normalized key
    localStorage.removeItem(dbInfo.keyPrefix + normalizedKey);
  });
  // Optionally invoke the external renderToolUseConfirmationDialog function with the promise and callback
  renderToolUseConfirmationDialog(removalPromise, callback);
  return removalPromise;
}

module.exports = removeItemFromLocalStorageAsync;