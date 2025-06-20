/**
 * Retrieves the value associated with a given key from the internal __data__ array.
 * Utilizes the Mq function to locate the index of the key within the data array.
 *
 * @param {any} key - The key to search for in the data array.
 * @returns {any} The value associated with the key, or undefined if the key is not found.
 */
function getValueByKeyFromDataArray(key) {
  // Access the internal data array stored on the current object
  const dataArray = this.__data__;
  // Use the external Mq function to find the index of the key in the data array
  const keyIndex = Mq(dataArray, key);
  // If the key is not found (index < 0), return undefined; otherwise, return the associated value
  return keyIndex < 0 ? undefined : dataArray[keyIndex][1];
}

module.exports = getValueByKeyFromDataArray;