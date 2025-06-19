/**
 * Checks if the provided key exists in the internal data store.
 *
 * @param {any} key - The key to check for existence in the internal data store.
 * @returns {boolean} True if the key exists, false otherwise.
 */
function hasKeyInInternalData(key) {
  // Check if the internal __data__ Map has the specified key
  return this.__data__.has(key);
}

module.exports = hasKeyInInternalData;