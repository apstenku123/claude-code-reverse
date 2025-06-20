/**
 * Calculates the sum of transformed values from an array using a provided iteratee function.
 *
 * If the input array is empty or falsy, returns 0.
 *
 * @param {Array} array - The array of values to process.
 * @param {Function} iteratee - The function invoked per element. Will be called with up to 2 arguments.
 * @returns {number} The sum of the transformed values, or 0 if the array is empty or falsy.
 */
function sumByTransformedValues(array, iteratee) {
  // Check if the array exists and has elements
  if (array && array.length) {
    // getConfiguredIteratee applies the iteratee with arity 2 (up to 2 arguments)
    // sumMappedValues performs the sum operation over the transformed array
    return sumMappedValues(array, getConfiguredIteratee(iteratee, 2));
  }
  // Return 0 if the array is empty or falsy
  return 0;
}

module.exports = sumByTransformedValues;