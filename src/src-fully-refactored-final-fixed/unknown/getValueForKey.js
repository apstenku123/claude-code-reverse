/**
 * Retrieves the value associated with the given key from the internal data array.
 * If the key is not found, returns undefined.
 *
 * @param {any} key - The key whose associated value is to be retrieved.
 * @returns {any} The value associated with the key, or undefined if not found.
 */
function getValueForKey(key) {
  // Access the internal data array stored in this object
  const dataArray = this.__data__;
  // Find the index of the entry with the specified key using the Mq function
  const entryIndex = Mq(dataArray, key);
  // If the key is not found (index < 0), return undefined; otherwise, return the value
  return entryIndex < 0 ? undefined : dataArray[entryIndex][1];
}

module.exports = getValueForKey;