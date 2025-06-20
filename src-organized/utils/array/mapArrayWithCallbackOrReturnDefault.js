/**
 * Maps each element of the input array using a provided callback function, or returns a default value if the array is empty or falsy.
 *
 * @param {Array} inputArray - The array to process. If falsy or empty, the function returns the default value.
 * @param {Function} callback - The function to apply to each element of the array. Will be wrapped by getConfiguredIteratee with arity 2.
 * @returns {*} The mapped array if inputArray is non-empty, otherwise the default value from mapInteractionsToRouteNames.
 */
function mapArrayWithCallbackOrReturnDefault(inputArray, callback) {
  // Check if the input array exists and has elements
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee wraps the callback, possibly enforcing arity or context
    // findMatchingElementByAccessor applies the mapping function (getConfiguredIteratee-wrapped callback) to the array, using IH as an additional parameter
    return findMatchingElementByAccessor(inputArray, getConfiguredIteratee(callback, 2), IH);
  } else {
    // If the array is empty or falsy, return the default value from mapInteractionsToRouteNames
    return mapInteractionsToRouteNames;
  }
}

module.exports = mapArrayWithCallbackOrReturnDefault;