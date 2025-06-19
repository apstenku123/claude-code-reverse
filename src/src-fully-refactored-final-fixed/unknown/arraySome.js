/**
 * Checks if at least one element in the array passes the provided test function.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @returns {boolean} Returns true if the predicate returns true for any element, otherwise false.
 */
function arraySome(array, predicate) {
  // If array is null or undefined, treat as empty
  const length = array == null ? 0 : array.length;
  // Iterate over each element in the array
  for (let index = 0; index < length; index++) {
    // If predicate returns true for any element, return true immediately
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  // If no element satisfies the predicate, return false
  return false;
}

module.exports = arraySome;