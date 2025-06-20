/**
 * Removes an entry from the internal __data__ array by key, updating the size property.
 *
 * @param {*} key - The key of the entry to remove from the data array.
 * @returns {boolean} True if the entry was removed, false if not found.
 */
function removeEntryFromData(key) {
  const dataArray = this.__data__;
  // Find the index of the entry with the given key
  const entryIndex = Mq(dataArray, key);
  if (entryIndex < 0) {
    // Entry not found
    return false;
  }
  const lastIndex = dataArray.length - 1;
  if (entryIndex === lastIndex) {
    // If the entry is the last one, simply remove isBlobOrFileLikeObject
    dataArray.pop();
  } else {
    // Otherwise, remove the entry at the found index
    gy2.call(dataArray, entryIndex, 1);
  }
  // Decrement the size property
  --this.size;
  return true;
}

module.exports = removeEntryFromData;