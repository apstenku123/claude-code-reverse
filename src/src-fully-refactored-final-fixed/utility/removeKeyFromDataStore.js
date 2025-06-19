/**
 * Removes a key from the internal data store if isBlobOrFileLikeObject exists.
 * Decrements the size property if the key was present and removed.
 *
 * @param {string} key - The key to remove from the data store.
 * @returns {boolean} True if the key was found and removed, false otherwise.
 */
function removeKeyFromDataStore(key) {
  // Check if the key exists in the data store
  const keyExists = this.has(key);
  let wasRemoved = false;

  if (keyExists) {
    // Remove the key from the internal data object
    wasRemoved = delete this.__data__[key];
    // Decrement the size if the key was successfully removed
    this.size -= wasRemoved ? 1 : 0;
  }

  return wasRemoved;
}

module.exports = removeKeyFromDataStore;