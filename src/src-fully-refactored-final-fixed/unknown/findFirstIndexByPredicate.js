/**
 * Finds the index of the first element in the array that satisfies the provided predicate function.
 *
 * @param {Array} array - The array to search through.
 * @param {Function} predicate - a function that takes an element from the array and returns a boolean.
 * @returns {number} The index of the first element that satisfies the predicate, or -1 if none do.
 */
function findFirstIndexByPredicate(array, predicate) {
  // Iterate through each element in the array
  for (let index = 0; index < array.length; index++) {
    // If the predicate returns true for the current element, return its index
    if (predicate(array[index]) === true) {
      return index;
    }
  }
  // If no element satisfies the predicate, return -1
  return -1;
}

module.exports = findFirstIndexByPredicate;