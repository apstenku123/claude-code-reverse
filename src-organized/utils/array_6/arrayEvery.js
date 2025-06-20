/**
 * Checks if all elements in the provided array pass the test implemented by the provided predicate function.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @returns {boolean} Returns true if all elements pass the predicate check, otherwise false.
 */
function arrayEvery(array, predicate) {
  // If array is null or undefined, treat as empty array
  const arrayLength = array == null ? 0 : array.length;
  // Iterate over each element in the array
  for (let index = 0; index < arrayLength; index++) {
    // If predicate returns false for any element, return false immediately
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  // All elements passed the predicate check
  return true;
}

module.exports = arrayEvery;