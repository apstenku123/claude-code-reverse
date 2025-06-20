/**
 * Finds the index of the first element in the array that satisfies the provided predicate function,
 * searching either forwards or backwards from a given starting index.
 *
 * @param {Array} array - The array to search through.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @param {number} startIndex - The index to start the search from.
 * @param {boolean} searchBackwards - If true, searches backwards; otherwise, searches forwards.
 * @returns {number} The index of the first element that satisfies the predicate; otherwise, -1.
 */
function findIndexByPredicate(array, predicate, startIndex, searchBackwards) {
  const arrayLength = array.length;
  // Set the initial index based on direction
  let currentIndex = startIndex + (searchBackwards ? 1 : -1);

  // Iterate through the array in the specified direction
  if (searchBackwards) {
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

module.exports = findIndexByPredicate;