/**
 * Removes a key from the internal __data__ Map and updates the size property.
 *
 * @param {any} key - The key to be deleted from the internal data store.
 * @returns {boolean} - Returns true if the key existed and has been removed, false otherwise.
 */
function deleteKeyFromInternalData(key) {
  // Access the internal data store (assumed to be a Map)
  const internalData = this.__data__;
  // Attempt to delete the key from the internal data store
  const wasDeleted = internalData.delete(key);
  // Update the size property to reflect the current size of the internal data store
  this.size = internalData.size;
  // Return whether the key was successfully deleted
  return wasDeleted;
}

module.exports = deleteKeyFromInternalData;