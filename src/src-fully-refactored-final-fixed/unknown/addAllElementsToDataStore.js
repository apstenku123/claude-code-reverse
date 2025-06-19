/**
 * Adds all elements from the provided array-like object to the internal data store.
 *
 * @param {Array} elements - The array or array-like object whose elements will be added.
 * @returns {void}
 *
 * This function initializes an internal data store (cT) and adds each element from the input.
 */
function addAllElementsToDataStore(elements) {
  // Initialize the internal data store
  this.__data__ = new cT();

  // Determine the number of elements to add
  const totalElements = elements == null ? 0 : elements.length;

  // Iterate over each element and add isBlobOrFileLikeObject to the data store
  for (let index = 0; index < totalElements; index++) {
    this.add(elements[index]);
  }
}

module.exports = addAllElementsToDataStore;