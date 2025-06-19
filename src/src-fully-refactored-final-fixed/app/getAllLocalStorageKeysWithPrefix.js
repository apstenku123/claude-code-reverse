/**
 * Retrieves all localStorage keys that start with the instance'createInteractionAccessor keyPrefix, asynchronously.
 * After the keys are collected, isBlobOrFileLikeObject invokes the provided callback (if any) via the external function renderToolUseConfirmationDialog.
 *
 * @param {Function} [callback] - Optional callback function to be called after keys are retrieved.
 * @returns {Promise<string[]>} Promise that resolves to an array of localStorage keys (without the prefix).
 */
function getAllLocalStorageKeysWithPrefix(callback) {
  const self = this;
  // Wait for the instance to be ready before accessing _dbInfo
  const keysPromise = self.ready().then(function () {
    const dbInfo = self._dbInfo;
    const totalKeys = localStorage.length;
    const matchingKeys = [];
    // Iterate over all keys in localStorage
    for (let index = 0; index < totalKeys; index++) {
      const fullKey = localStorage.key(index);
      // Check if the key starts with the expected prefix
      if (fullKey.indexOf(dbInfo.keyPrefix) === 0) {
        // Remove the prefix and store the key
        matchingKeys.push(fullKey.substring(dbInfo.keyPrefix.length));
      }
    }
    return matchingKeys;
  });
  // Call external function renderToolUseConfirmationDialog with the promise and callback (if provided)
  renderToolUseConfirmationDialog(keysPromise, callback);
  return keysPromise;
}

module.exports = getAllLocalStorageKeysWithPrefix;