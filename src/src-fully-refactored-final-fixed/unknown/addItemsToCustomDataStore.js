/**
 * Adds all items from the provided array-like collection to the internal custom data store.
 *
 * @param {Array} items - An array or array-like object containing items to add to the data store.
 * @returns {void}
 *
 * This function initializes the internal data store (using cT) and iterates over the provided items,
 * adding each one to the store via the add() method.
 */
function addItemsToCustomDataStore(items) {
  // Determine the number of items to add; handle null/undefined input gracefully
  const totalItems = items == null ? 0 : items.length;

  // Initialize the internal data store
  this.__data__ = new cT();

  // Add each item from the input collection to the data store
  for (let index = 0; index < totalItems; index++) {
    this.add(items[index]);
  }
}

module.exports = addItemsToCustomDataStore;