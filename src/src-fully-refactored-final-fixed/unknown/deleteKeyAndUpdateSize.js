/**
 * Deletes a key from the internal data store and updates the size property.
 *
 * @param {any} key - The key to be deleted from the internal data store.
 * @returns {boolean} - Returns true if the key existed and has been removed, false otherwise.
 */
function deleteKeyAndUpdateSize(key) {
  // Access the internal data store (assumed to be a Map or similar structure)
  const internalDataStore = this.__data__;

  // Attempt to delete the key from the data store
  const wasDeleted = internalDataStore.delete(key);

  // Update the size property to reflect the new size of the data store
  this.size = internalDataStore.size;

  // Return whether the key was deleted
  return wasDeleted;
}

module.exports = deleteKeyAndUpdateSize;