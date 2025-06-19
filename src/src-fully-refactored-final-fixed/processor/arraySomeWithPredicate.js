/**
 * Checks if at least one element in the given array satisfies the provided predicate function.
 *
 * @param {Array} array - The array to iterate over.
 * @param {*} comparisonValue - The value to compare each element against, passed to the predicate.
 * @param {Function} predicate - The function invoked per iteration. Should return true if the condition is met.
 * @returns {boolean} Returns true if any element passes the predicate check, otherwise false.
 */
function arraySomeWithPredicate(array, comparisonValue, predicate) {
  // If the array is null or undefined, treat as empty
  const arrayLength = array == null ? 0 : array.length;
  // Iterate over each element in the array
  for (let index = 0; index < arrayLength; index++) {
    // If the predicate returns true for any element, return true immediately
    if (predicate(comparisonValue, array[index])) {
      return true;
    }
  }
  // If no element satisfies the predicate, return false
  return false;
}

module.exports = arraySomeWithPredicate;