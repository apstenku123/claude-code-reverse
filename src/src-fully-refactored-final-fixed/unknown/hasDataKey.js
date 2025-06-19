/**
 * Checks if the internal data store contains the specified key.
 *
 * @param {any} key - The key to check for existence in the internal data store.
 * @returns {boolean} True if the key exists in the data store; otherwise, false.
 */
function hasDataKey(key) {
  // Check if the internal __data__ Map has the provided key
  return this.__data__.has(key);
}

module.exports = hasDataKey;