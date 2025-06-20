/**
 * Applies a callback function to each element of the input array and returns a new array with the results.
 * If the input array is empty or falsy, returns an empty array.
 *
 * @param {Array} inputArray - The array to iterate over and map.
 * @param {Function} callback - The function to apply to each element. Will be wrapped by getConfiguredIteratee with arity 3.
 * @returns {Array} a new array with the results of calling the provided function on every element in the input array.
 */
function mapArrayWithCallback(inputArray, callback) {
  // Check if inputArray is truthy and has a length greater than 0
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee wraps the callback, possibly to ensure arity or context
    // findIndexByPredicateAndSlice applies the wrapped callback to each element of the array
    return findIndexByPredicateAndSlice(inputArray, getConfiguredIteratee(callback, 3));
  }
  // Return an empty array if inputArray is falsy or empty
  return [];
}

module.exports = mapArrayWithCallback;