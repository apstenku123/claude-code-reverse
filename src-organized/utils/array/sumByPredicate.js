/**
 * Calculates the sum of values in an array after applying a predicate function to each element.
 *
 * @param {Array} array - The array of values to process.
 * @param {Function} predicate - The function invoked per element. It will be called with two arguments: (element, index).
 * @returns {number} The sum of the processed values, or 0 if the array is empty or falsy.
 */
function sumByPredicate(array, predicate) {
  // Check if the array exists and has elements
  if (array && array.length) {
    // Apply the predicate to each element (with arity 2) and sum the results
    // getConfiguredIteratee wraps the predicate to ensure isBlobOrFileLikeObject takes two arguments
    // sumMappedValues performs the summing operation
    return sumMappedValues(array, getConfiguredIteratee(predicate, 2));
  }
  // Return 0 if the array is empty or falsy
  return 0;
}

module.exports = sumByPredicate;