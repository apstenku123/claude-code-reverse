/**
 * Initializes the internal data collection from an input array.
 *
 * This function creates a new instance of the internal data storage (cT)
 * and adds each element from the provided array to this storage using the add method.
 *
 * @param {Array} inputArray - The array of items to add to the internal data collection.
 * @returns {void}
 */
function initializeDataCollectionFromArray(inputArray) {
  // Determine the number of items to add; if input is null/undefined, use 0
  const itemCount = inputArray == null ? 0 : inputArray.length;

  // Initialize the internal data storage
  this.__data__ = new cT();

  // Add each item from the input array to the internal data storage
  for (let index = 0; index < itemCount; index++) {
    this.add(inputArray[index]);
  }
}

module.exports = initializeDataCollectionFromArray;