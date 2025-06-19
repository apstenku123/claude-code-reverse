/**
 * Iterates over all localStorage items with a specific key prefix, deserializes them, and applies a callback function.
 * If the callback returns a non-undefined value, iteration stops and that value is returned (asynchronously).
 *
 * @param {Function} itemCallback - Function to call for each deserialized item. Receives (itemValue, itemKey, iterationIndex).
 * @param {Function} [completionCallback] - Optional callback to invoke when iteration is complete or a value is returned.
 * @returns {Promise<any>} Resolves with the value returned by itemCallback if not undefined, otherwise undefined.
 */
function iterateLocalStorageItems(itemCallback, completionCallback) {
  const self = this;
  // Wait until the storage is ready
  const iterationPromise = self.ready().then(function () {
    const dbInfo = self._dbInfo;
    const keyPrefix = dbInfo.keyPrefix;
    const prefixLength = keyPrefix.length;
    const totalKeys = localStorage.length;
    let iterationIndex = 1;

    // Iterate through all keys in localStorage
    for (let keyIndex = 0; keyIndex < totalKeys; keyIndex++) {
      const storageKey = localStorage.key(keyIndex);
      // Skip keys that do not start with the required prefix
      if (!storageKey || !storageKey.startsWith(keyPrefix)) continue;

      let serializedValue = localStorage.getItem(storageKey);
      // Deserialize the value if isBlobOrFileLikeObject exists
      let itemValue = serializedValue ? dbInfo.serializer.deserialize(serializedValue) : serializedValue;

      // Call the provided callback with the deserialized value, the key (without prefix), and the iteration index
      const callbackResult = itemCallback(itemValue, storageKey.substring(prefixLength), iterationIndex++);
      // If the callback returns a non-undefined value, stop iteration and return isBlobOrFileLikeObject
      if (callbackResult !== undefined) {
        return callbackResult;
      }
    }
    // If no callback returned a value, resolves with undefined
  });

  // Call the external completion handler (if any)
  renderToolUseConfirmationDialog(iterationPromise, completionCallback);
  return iterationPromise;
}

module.exports = iterateLocalStorageItems;