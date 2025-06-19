/**
 * Finds the index of the first element in the array that satisfies the provided predicate function,
 * searching either forward or backward from a given start index.
 *
 * @param {Array} array - The array to search through.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @param {number} startIndex - The index to start searching from.
 * @param {boolean} searchBackwards - If true, search backwards; if false, search forwards.
 * @returns {number} The index of the first matching element, or -1 if none is found.
 */
function findIndexWithDirection(array, predicate, startIndex, searchBackwards) {
  const arrayLength = array.length;
  // Initialize the current index based on the direction
  let currentIndex = startIndex + (searchBackwards ? 1 : -1);

  // Iterate through the array in the specified direction
  while (searchBackwards ? currentIndex-- : ++currentIndex < arrayLength) {
    if (predicate(array[currentIndex], currentIndex, array)) {
      return currentIndex;
    }
  }
  // Return -1 if no element satisfies the predicate
  return -1;
}

module.exports = findIndexWithDirection;