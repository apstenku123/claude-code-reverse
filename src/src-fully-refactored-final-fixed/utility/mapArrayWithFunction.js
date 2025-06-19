/**
 * Applies a mapping function to each element of an array if the array is not empty.
 *
 * @param {Array} inputArray - The array to be mapped.
 * @param {Function} iteratee - The function to apply to each element. Will be processed by getConfiguredIteratee with arity 3.
 * @returns {Array} a new array with the results of calling the mapping function on each element, or an empty array if input is empty or falsy.
 */
function mapArrayWithFunction(inputArray, iteratee) {
  // Check if inputArray exists and has elements
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee processes the iteratee (possibly to ensure arity of 3)
    // findIndexByPredicateAndSlice applies the processed iteratee to each element of inputArray
    return findIndexByPredicateAndSlice(inputArray, getConfiguredIteratee(iteratee, 3));
  }
  // Return empty array if input is falsy or empty
  return [];
}

module.exports = mapArrayWithFunction;