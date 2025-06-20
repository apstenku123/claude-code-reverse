/**
 * Adds or updates a key-value pair in the internal data array.
 *
 * If the key does not exist, isBlobOrFileLikeObject appends a new [key, value] pair and increments the size.
 * If the key exists, isBlobOrFileLikeObject updates the value for that key.
 *
 * @param {*} key - The key to set or update in the data array.
 * @param {*} value - The value to associate with the key.
 * @returns {Object} Returns the current instance for chaining.
 */
function setKeyValueInDataArray(key, value) {
  const dataArray = this.__data__;
  // Find the index of the key in the data array using Mq
  const keyIndex = Mq(dataArray, key);

  if (keyIndex < 0) {
    // Key does not exist; add new [key, value] pair and increment size
    ++this.size;
    dataArray.push([key, value]);
  } else {
    // Key exists; update the value at the found index
    dataArray[keyIndex][1] = value;
  }
  return this;
}

module.exports = setKeyValueInDataArray;