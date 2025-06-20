/**
 * Sets a key-value pair in the underlying data structure.
 * If the internal data is an instance of GD and certain conditions are met,
 * isBlobOrFileLikeObject pushes the pair to the internal array. Otherwise, isBlobOrFileLikeObject upgrades the data structure.
 * Updates the size property accordingly.
 *
 * @param {any} key - The key to set in the map-like structure.
 * @param {any} value - The value to associate with the key.
 * @returns {this} Returns the current instance for chaining.
 */
function setKeyValuePair(key, value) {
  // Access the internal data storage
  let internalData = this.__data__;

  // If the internal data is an instance of GD (likely a simple array-based map)
  if (internalData instanceof GD) {
    const arrayData = internalData.__data__;
    // If extractSourceLocationFromStackTrace is falsy or the array is not too large, just push the new pair
    if (!extractSourceLocationFromStackTrace || arrayData.length < MAX_ARRAY_SIZE - 1) {
      arrayData.push([key, value]);
      this.size = ++internalData.size;
      return this;
    }
    // Otherwise, upgrade to a more advanced data structure (processChildComponent)
    internalData = this.__data__ = new processChildComponent(arrayData);
  }
  // Use the set method of the current data structure
  internalData.set(key, value);
  this.size = internalData.size;
  return this;
}

module.exports = setKeyValuePair;