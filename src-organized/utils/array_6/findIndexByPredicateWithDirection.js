/**
 * Searches an array for the first element that satisfies the provided predicate function,
 * starting from a given index and proceeding either forwards or backwards depending on the direction flag.
 *
 * @param {Array} array - The array to search through.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @param {number} startIndex - The index to start the search from.
 * @param {boolean} searchBackwards - If true, searches backwards; otherwise, searches forwards.
 * @returns {number} The index of the first element that satisfies the predicate; otherwise, -1.
 */
function findIndexByPredicateWithDirection(array, predicate, startIndex, searchBackwards) {
  const arrayLength = array.length;
  // Determine initial index based on direction
  let currentIndex = startIndex + (searchBackwards ? 1 : -1);

  // Iterate through the array in the specified direction
  if (searchBackwards) {
    // Search backwards
    while (currentIndex--) {
      if (predicate(array[currentIndex], currentIndex, array)) {
        return currentIndex;
      }
    }
  } else {
    // Search forwards
    while (++currentIndex < arrayLength) {
      if (predicate(array[currentIndex], currentIndex, array)) {
        return currentIndex;
      }
    }
  }

  // No element satisfied the predicate
  return -1;
}

module.exports = findIndexByPredicateWithDirection;