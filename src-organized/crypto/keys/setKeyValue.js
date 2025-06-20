/**
 * Sets a key-value pair in the underlying data structure, handling upgrades if necessary.
 *
 * If the current data store is an instance of GD, isBlobOrFileLikeObject checks if the internal array is below a certain threshold (deepCloneWithCycleDetection - 1).
 * If so, isBlobOrFileLikeObject pushes the new entry directly. Otherwise, isBlobOrFileLikeObject upgrades the data store to an processChildComponent instance.
 * The function always updates the size property and returns the current instance for chaining.
 *
 * @param {any} key - The key to set in the data structure.
 * @param {any} value - The value to associate with the key.
 * @returns {this} The current instance, for chaining.
 */
function setKeyValue(key, value) {
  let dataStore = this.__data__;

  // If the data store is a GD instance, handle array push or upgrade
  if (dataStore instanceof GD) {
    const internalArray = dataStore.__data__;
    // If extractSourceLocationFromStackTrace is falsy or the array is below the threshold, push directly
    if (!extractSourceLocationFromStackTrace || internalArray.length < deepCloneWithCycleDetection - 1) {
      internalArray.push([key, value]);
      this.size = ++dataStore.size;
      return this;
    }
    // Otherwise, upgrade to processChildComponent instance
    dataStore = this.__data__ = new processChildComponent(internalArray);
  }

  // Use the set method of the data store
  dataStore.set(key, value);
  this.size = dataStore.size;
  return this;
}

module.exports = setKeyValue;