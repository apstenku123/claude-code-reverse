/**
 * Removes a key from the internal data storage if isBlobOrFileLikeObject exists and updates the size accordingly.
 *
 * @param {string} key - The key to remove from the internal data store.
 * @returns {boolean} - Returns true if the key was present and removed, false otherwise.
 */
function removeKeyFromData(key) {
  // Check if the key exists in the data store
  const keyExists = this.has(key);
  let wasDeleted = false;

  if (keyExists) {
    // Delete the key from the internal data object
    wasDeleted = delete this.__data__[key];
    // Decrement the size if deletion was successful
    if (wasDeleted) {
      this.size -= 1;
    }
  }

  return wasDeleted;
}

module.exports = removeKeyFromData;