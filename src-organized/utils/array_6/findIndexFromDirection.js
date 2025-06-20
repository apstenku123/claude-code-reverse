/**
 * Searches an array for the first element that satisfies the provided predicate function, starting from a given index and moving either forward or backward.
 *
 * @param {Array} array - The array to search through.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @param {number} startIndex - The index to start searching from.
 * @param {boolean} searchBackward - If true, searches backward; if false, searches forward.
 * @returns {number} The index of the first element that satisfies the predicate, or -1 if none is found.
 */
function findIndexFromDirection(array, predicate, startIndex, searchBackward) {
  const arrayLength = array.length;
  // Set the initial index based on search direction
  let currentIndex = startIndex + (searchBackward ? 1 : -1);

  // Iterate in the specified direction
  if (searchBackward) {
    while (--currentIndex >= 0) {
      if (predicate(array[currentIndex], currentIndex, array)) {
        return currentIndex;
      }
    }
  } else {
    while (++currentIndex < arrayLength) {
      if (predicate(array[currentIndex], currentIndex, array)) {
        return currentIndex;
      }
    }
  }

  // Return -1 if no matching element is found
  return -1;
}

module.exports = findIndexFromDirection;