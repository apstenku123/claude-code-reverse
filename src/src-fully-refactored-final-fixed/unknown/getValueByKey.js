/**
 * Retrieves the value associated with the given key from the internal data array.
 * If the key is not found, returns the default value from processInteractionEntries.
 *
 * @param {any} key - The key to search for in the data array.
 * @returns {any} The value associated with the key, or the default value if not found.
 */
function getValueByKey(key) {
  // Access the internal data array from the current instance
  const dataArray = this.__data__;
  // Find the index of the key in the data array using the helper function
  const keyIndex = findKeyIndex(dataArray, key);
  // If the key is not found, return the default value from processInteractionEntries
  if (keyIndex < 0) {
    return processInteractionEntries;
  }
  // Otherwise, return the value associated with the found key
  return dataArray[keyIndex][1];
}

module.exports = getValueByKey;