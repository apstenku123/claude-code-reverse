/**
 * Removes a key from the current collection and updates the size accordingly.
 *
 * @param {any} key - The key to remove from the collection.
 * @returns {boolean} - Returns true if the key was removed, false otherwise.
 */
function removeKeyAndUpdateSize(key) {
  // Attempt to delete the key from the collection using Oq (likely a helper for Map/Set-like structures)
  const wasDeleted = Oq(this, key).delete(key);
  // If the key was deleted, decrement the size property
  this.size -= wasDeleted ? 1 : 0;
  // Return whether the key was deleted
  return wasDeleted;
}

module.exports = removeKeyAndUpdateSize;