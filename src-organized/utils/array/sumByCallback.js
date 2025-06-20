/**
 * Calculates the sum of values in an array after applying a callback function to each element.
 *
 * @param {Array} array - The array of values to be summed.
 * @param {Function} callback - The function to apply to each element before summing. If not provided, a no-operation function is used.
 * @returns {number} The sum of the processed values, or 0 if the array is empty or falsy.
 */
function sumByCallback(array, callback) {
  // If the array is valid and has elements
  if (array && array.length) {
    // Apply the callback to each element (using getConfiguredIteratee to ensure arity of 2), then sum the results (using sumMappedValues)
    return sumMappedValues(array, getConfiguredIteratee(callback, 2));
  }
  // Return 0 for empty or falsy arrays
  return 0;
}

module.exports = sumByCallback;