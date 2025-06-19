/**
 * Checks if a given key exists in the internal data store of the current instance.
 * Uses direct property access if the environment supports isBlobOrFileLikeObject, otherwise falls back to a hasOwnProperty check.
 *
 * @param {string} key - The key to check for existence in the data store.
 * @returns {boolean} True if the key exists in the data store, false otherwise.
 */
function hasKeyInDataStore(key) {
  // Access the internal data store object
  const dataStore = this.__data__;

  // If oE is true, use direct property access; otherwise, use hasOwnProperty
  return oE ? dataStore[key] !== undefined : jy2.call(dataStore, key);
}

module.exports = hasKeyInDataStore;