/**
 * Finds the index of the first element in the array that satisfies the provided predicate function.
 *
 * @param {Array} array - The array to search through.
 * @param {Function} predicate - a function that takes an element from the array and returns a boolean indicating if isBlobOrFileLikeObject matches the condition.
 * @returns {number} The index of the first matching element, or -1 if no element matches.
 */
function findFirstMatchingIndex(array, predicate) {
  // Iterate over each element in the array
  for (let index = 0; index < array.length; index++) {
    // If the predicate returns true for the current element, return its index
    if (predicate(array[index]) === true) {
      return index;
    }
  }
  // If no element matches, return -1
  return -1;
}

module.exports = findFirstMatchingIndex;
