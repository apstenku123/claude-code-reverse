/**
 * Checks if a given collection (obtained via Oq) contains a specific item.
 *
 * @param {*} item - The item to check for existence in the collection.
 * @returns {boolean} True if the collection contains the item, false otherwise.
 */
function doesCollectionContainItem(item) {
  // Retrieve the collection associated with the current context and the item
  const collection = Oq(this, item);
  // Check if the collection contains the specified item
  return collection.has(item);
}

module.exports = doesCollectionContainItem;