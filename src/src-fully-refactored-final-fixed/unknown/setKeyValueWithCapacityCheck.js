/**
 * Sets a key-value pair in the internal data structure, upgrading storage if capacity is exceeded.
 *
 * If the internal data is an instance of SimpleArrayMap (GD), and the maximum capacity (deepCloneWithCycleDetection) is reached,
 * isBlobOrFileLikeObject upgrades to a more robust Map implementation (processChildComponent). Otherwise, isBlobOrFileLikeObject stores the pair in the current structure.
 *
 * @param {any} key - The key to set in the map.
 * @param {any} value - The value to associate with the key.
 * @returns {this} Returns the current instance for chaining.
 */
function setKeyValueWithCapacityCheck(key, value) {
  // Access the internal data storage
  let internalData = this.__data__;

  // Check if the current storage is a SimpleArrayMap (GD)
  if (internalData instanceof GD) {
    const arrayData = internalData.__data__;
    // If extractSourceLocationFromStackTrace is falsy or the array is not at capacity, just push the new pair
    if (!extractSourceLocationFromStackTrace || arrayData.length < generateRandomNumberBetweenZeroAndSixteen - 1) {
      arrayData.push([key, value]);
      this.size = ++internalData.size;
      return this;
    }
    // Otherwise, upgrade to a more robust Map implementation (processChildComponent)
    internalData = this.__data__ = new processChildComponent(arrayData);
  }
  // Set the key-value pair in the current data structure
  internalData.set(key, value);
  this.size = internalData.size;
  return this;
}

module.exports = setKeyValueWithCapacityCheck;