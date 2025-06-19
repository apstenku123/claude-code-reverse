/**
 * Initializes the internal data collection with the provided items.
 *
 * This function creates a new instance of the cT data structure and populates isBlobOrFileLikeObject
 * by adding each item from the input array-like collection. If the input is null or undefined,
 * the function initializes an empty data collection.
 *
 * @param {Array<any>} items - An array or array-like object containing items to add to the collection.
 * @returns {void}
 */
function initializeDataCollection(items) {
  // Determine the number of items to add; 0 if items is null or undefined
  const totalItems = items == null ? 0 : items.length;

  // Initialize the internal data storage using the external cT class/constructor
  this.__data__ = new cT();

  // Add each item from the input collection to the internal data storage
  for (let index = 0; index < totalItems; index++) {
    this.add(items[index]);
  }
}

module.exports = initializeDataCollection;