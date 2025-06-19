/**
 * Applies a transformation function to each element of the input array and aggregates the result.
 * If the input array is empty or falsy, returns 0.
 *
 * @param {Array} inputArray - The array of items to process.
 * @param {Function} transformFunction - The function to apply to each item in the array.
 * @returns {*} The aggregated result after applying the transformation, or 0 if the array is empty or falsy.
 */
function applyFunctionToArrayAndAggregate(inputArray, transformFunction) {
  // Check if the input array exists and has elements
  if (inputArray && inputArray.length) {
    // Apply the transformation function to each element (with arity 2), then aggregate
    return sumMappedValues(inputArray, getConfiguredIteratee(transformFunction, 2));
  } else {
    // Return 0 if the array is empty or falsy
    return 0;
  }
}

module.exports = applyFunctionToArrayAndAggregate;