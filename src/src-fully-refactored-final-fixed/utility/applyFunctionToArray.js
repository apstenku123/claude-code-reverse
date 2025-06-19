/**
 * Applies a provided function to each element of an array, returning a new array of results.
 * If the input array is empty or falsy, returns an empty array.
 *
 * @param {Array} inputArray - The array to process.
 * @param {Function} iteratee - The function to apply to each element. Will be wrapped by getConfiguredIteratee with arity 3.
 * @returns {Array} a new array with the results of calling the iteratee on each element.
 */
function applyFunctionToArray(inputArray, iteratee) {
  // Check if inputArray is truthy and has a length greater than 0
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee wraps the iteratee to ensure isBlobOrFileLikeObject has arity 3 (value, index, array)
    // findIndexByPredicateAndSlice applies the wrapped iteratee to each element of the array
    return findIndexByPredicateAndSlice(inputArray, getConfiguredIteratee(iteratee, 3));
  }
  // Return an empty array if inputArray is falsy or empty
  return [];
}

module.exports = applyFunctionToArray;