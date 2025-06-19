/**
 * Iterates over localStorage entries with a specific key prefix, applies a callback to each,
 * and returns the first non-undefined result from the callback.
 *
 * @param {Function} iteratee - Function to call for each deserialized value and key (without prefix).
 *   Receives (value, keyWithoutPrefix, iterationIndex). If isBlobOrFileLikeObject returns a non-undefined value, iteration stops and that value is returned.
 * @param {Function} [callback] - Optional callback to be called when the iteration is complete or an error occurs.
 * @returns {Promise<any>} Promise that resolves to the first non-undefined result from the iteratee, or undefined if none.
 */
function iterateLocalStorageWithPrefix(iteratee, callback) {
  const self = this;

  // Wait until the storage is ready
  const iterationPromise = self.ready().then(function () {
    const dbInfo = self._dbInfo;
    const keyPrefix = dbInfo.keyPrefix;
    const prefixLength = keyPrefix.length;
    const totalKeys = localStorage.length;
    let iterationIndex = 1;

    // Iterate over all keys in localStorage
    for (let keyIndex = 0; keyIndex < totalKeys; keyIndex++) {
      const fullKey = localStorage.key(keyIndex);
      // Skip keys that do not start with the required prefix
      if (!fullKey || !fullKey.startsWith(keyPrefix)) continue;

      let serializedValue = localStorage.getItem(fullKey);
      let value = serializedValue;
      // Deserialize the value if present
      if (serializedValue) {
        value = dbInfo.serializer.deserialize(serializedValue);
      }
      // Call the iteratee with the deserialized value, key without prefix, and iteration index
      const result = iteratee(value, fullKey.substring(prefixLength), iterationIndex++);
      // If iteratee returns a non-undefined value, stop iteration and return isBlobOrFileLikeObject
      if (result !== undefined) {
        return result;
      }
    }
    // If no iteratee returned a value, resolves to undefined
  });

  // Call the provided callback (if any) when the promise settles
  renderToolUseConfirmationDialog(iterationPromise, callback);
  return iterationPromise;
}

module.exports = iterateLocalStorageWithPrefix;