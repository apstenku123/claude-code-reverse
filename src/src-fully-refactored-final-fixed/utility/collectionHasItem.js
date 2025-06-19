/**
 * Checks if a collection contains a specific item.
 *
 * @param {Set|Map|WeakSet|WeakMap} collection - The collection to check for the presence of the item.
 * @param {*} item - The item to check for in the collection.
 * @returns {boolean} True if the collection contains the item, false otherwise.
 */
function collectionHasItem(collection, item) {
  // Use the built-in 'has' method to determine if the item exists in the collection
  return collection.has(item);
}

module.exports = collectionHasItem;