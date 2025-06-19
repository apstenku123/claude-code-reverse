/**
 * Sets a key-value pair in a custom map-like data structure, handling internal upgrades if needed.
 *
 * If the internal data storage is an instance of Lq and certain conditions are met (e.g., storage is not full),
 * the key-value pair is pushed directly to the internal array. If the storage is full, isBlobOrFileLikeObject upgrades the storage
 * to a new cT instance. The function always updates the size property accordingly.
 *
 * @param {any} key - The key to set in the map.
 * @param {any} value - The value to associate with the key.
 * @returns {this} Returns the current map instance for chaining.
 */
function setKeyValueInCustomMap(key, value) {
  let internalStorage = this.__data__;

  // If the internal storage is an instance of Lq (likely a lightweight map implementation)
  if (internalStorage instanceof Lq) {
    const internalArray = internalStorage.__data__;
    // If Rq is falsy or the internal array is not full, push the new entry
    if (!Rq || internalArray.length < ex2 - 1) {
      internalArray.push([key, value]);
      this.size = ++internalStorage.size;
      return this;
    }
    // Otherwise, upgrade to a more robust map implementation (cT)
    internalStorage = this.__data__ = new cT(internalArray);
  }

  // Use the set method of the current storage to add the key-value pair
  internalStorage.set(key, value);
  this.size = internalStorage.size;
  return this;
}

module.exports = setKeyValueInCustomMap;