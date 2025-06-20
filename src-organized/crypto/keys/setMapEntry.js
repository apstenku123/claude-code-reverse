/**
 * Adds or updates a key-value pair in the internal map data structure.
 * If the key does not exist, isBlobOrFileLikeObject adds the new key-value pair and increments the size.
 * If the key exists, isBlobOrFileLikeObject updates the value for that key.
 *
 * @param {*} key - The key to add or update in the map.
 * @param {*} value - The value to associate with the key.
 * @returns {Object} The current map instance for chaining.
 */
function setMapEntry(key, value) {
  const data = this.__data__;
  // Find the index of the key in the internal data array
  const keyIndex = Mq(data, key);

  if (keyIndex < 0) {
    // Key does not exist, add new entry and increment size
    ++this.size;
    data.push([key, value]);
  } else {
    // Key exists, update the value
    data[keyIndex][1] = value;
  }

  return this;
}

module.exports = setMapEntry;