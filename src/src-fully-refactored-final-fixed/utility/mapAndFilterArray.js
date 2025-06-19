/**
 * Applies a mapping function to each element of the input array and returns a new array.
 * If the input array is empty or falsy, returns an empty array.
 *
 * @param {Array} inputArray - The array to be mapped.
 * @param {Function} iteratee - The function invoked per iteration. Will be wrapped with getConfiguredIteratee(iteratee, 3).
 * @returns {Array} The new mapped array, or an empty array if input is empty/falsy.
 */
function mapAndFilterArray(inputArray, iteratee) {
  // Check if inputArray is truthy and has a length property greater than 0
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee(iteratee, 3) likely wraps the iteratee to ensure arity or context
    // findIndexByPredicateAndSlice performs the mapping operation with additional flags
    // The flags (!1, !0) are equivalent to (false, true)
    return findIndexByPredicateAndSlice(inputArray, getConfiguredIteratee(iteratee, 3), false, true);
  }
  // Return empty array if input is falsy or empty
  return [];
}

module.exports = mapAndFilterArray;