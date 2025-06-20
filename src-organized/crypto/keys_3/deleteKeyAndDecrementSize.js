/**
 * Attempts to delete a key from the current context using the Oq function.
 * If the key is successfully deleted, decrements the size property by 1.
 *
 * @param {any} key - The key to be deleted from the collection.
 * @returns {boolean} - Returns true if the key was deleted, false otherwise.
 */
function deleteKeyAndDecrementSize(key) {
  // Attempt to delete the key using the Oq function in the current context
  const wasDeleted = Oq(this, key).delete(key);
  // If the key was deleted, decrement the size property
  if (wasDeleted) {
    this.size -= 1;
  }
  return wasDeleted;
}

module.exports = deleteKeyAndDecrementSize;