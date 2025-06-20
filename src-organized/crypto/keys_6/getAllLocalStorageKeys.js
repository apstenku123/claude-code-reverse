/**
 * Retrieves all keys from localStorage that match the current database'createInteractionAccessor key prefix.
 *
 * @param {any} callback - Optional callback to be invoked after the keys are retrieved.
 * @returns {Promise<string[]>} a promise that resolves to an array of matching keys (without the prefix).
 */
function getAllLocalStorageKeys(callback) {
  const self = this;
  // Wait until the database is ready
  const readyPromise = self.ready().then(function () {
    const dbInfo = self._dbInfo;
    const totalKeys = localStorage.length;
    const matchingKeys = [];

    // Iterate through all keys in localStorage
    for (let index = 0; index < totalKeys; index++) {
      const storageKey = localStorage.key(index);
      // Check if the key starts with the database'createInteractionAccessor key prefix
      if (storageKey.indexOf(dbInfo.keyPrefix) === 0) {
        // Remove the prefix and add the key to the result array
        matchingKeys.push(storageKey.substring(dbInfo.keyPrefix.length));
      }
    }
    return matchingKeys;
  });

  // Call the external function renderToolUseConfirmationDialog with the promise and callback
  renderToolUseConfirmationDialog(readyPromise, callback);
  return readyPromise;
}

module.exports = getAllLocalStorageKeys;