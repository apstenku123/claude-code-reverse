/**
 * Checks if at least one element in the provided array passes the given predicate function.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} predicate - The function invoked per iteration. Receives (element, index, array).
 * @returns {boolean} Returns true if any element passes the predicate check, otherwise false.
 */
function arraySomePredicate(array, predicate) {
  // If array is null or undefined, treat as empty
  const arrayLength = array == null ? 0 : array.length;
  // Iterate through each element in the array
  for (let index = 0; index < arrayLength; index++) {
    // If predicate returns true for any element, return true immediately
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  // If no element passes the predicate, return false
  return false;
}

module.exports = arraySomePredicate;