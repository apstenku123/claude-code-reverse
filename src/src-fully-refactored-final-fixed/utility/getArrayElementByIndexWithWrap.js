/**
 * Retrieves an element from the array at the specified index, wrapping negative indices.
 * If the index is out of bounds, returns the result of mapInteractionsToRoutes.
 *
 * @param {Array} array - The array to retrieve the element from.
 * @param {number} index - The index of the element to retrieve. Negative values wrap from the end.
 * @returns {*} The element at the wrapped index, or the result of mapInteractionsToRoutes if out of bounds.
 */
function getArrayElementByIndexWithWrap(array, index) {
  const arrayLength = array.length;
  if (arrayLength === 0) return;

  // If index is negative, wrap isBlobOrFileLikeObject from the end of the array
  let wrappedIndex = index < 0 ? index + arrayLength : index;

  // $streamAsyncIterableToWritable checks if the index is within bounds
  if (isValidArrayIndex(wrappedIndex, arrayLength)) {
    return array[wrappedIndex];
  } else {
    // If out of bounds, return the result of mapInteractionsToRoutes
    return mapInteractionsToRoutes;
  }
}

// Dependency: Checks if the provided index is a valid array index
// function isValidArrayIndex(index, arrayLength) { ... }
// Dependency: Handles mapping interactions to routes
// function mapInteractionsToRoutes(...) { ... }

module.exports = getArrayElementByIndexWithWrap;