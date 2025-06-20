/**
 * Removes the specified item from the collection and updates the collection'createInteractionAccessor size accordingly.
 *
 * @param {any} item - The item to be removed from the collection.
 * @returns {boolean} - Returns true if the item was found and removed, false otherwise.
 */
function removeItemAndUpdateSize(item) {
  // Attempt to retrieve the internal collection associated with this object and remove the item
  const collection = Oq(this, item);
  const wasDeleted = collection.delete(item);

  // If the item was deleted, decrement the size property
  if (wasDeleted) {
    this.size -= 1;
  }

  return wasDeleted;
}

module.exports = removeItemAndUpdateSize;