/**
 * Searches an array for the first element that satisfies a provided predicate function,
 * starting from a specified index and moving either forward or backward.
 *
 * @param {Array} array - The array to search through.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @param {number} startIndex - The index to start searching from.
 * @param {boolean} searchBackwards - If true, search backwards; otherwise, search forwards.
 * @returns {number} The index of the first element that satisfies the predicate; otherwise, -1.
 */
function findIndexByPredicateFromDirection(array, predicate, startIndex, searchBackwards) {
  const arrayLength = array.length;
  // Determine initial index based on direction
  let currentIndex = startIndex + (searchBackwards ? 1 : -1);

  // Iterate in the specified direction
  while (searchBackwards ? --currentIndex >= 0 : ++currentIndex < arrayLength) {
    // If predicate returns true, return the current index
    if (predicate(array[currentIndex], currentIndex, array)) {
      return currentIndex;
    }
  }
  // No matching element found
  return -1;
}

module.exports = findIndexByPredicateFromDirection;
