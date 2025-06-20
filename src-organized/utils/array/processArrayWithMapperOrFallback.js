/**
 * Processes an input array with a provided mapping function and a handler.
 * If the input array is empty or undefined, returns the fallback result.
 *
 * @param {Array} inputArray - The array to process.
 * @param {Function} mappingFunction - The function to apply to each element (will be wrapped by getConfiguredIteratee with arity 2).
 * @returns {*} - The result of processing the array, or the fallback result if the array is empty.
 */
function processArrayWithMapperOrFallback(inputArray, mappingFunction) {
  // External dependencies (assumed to be imported elsewhere in the actual codebase)
  // - findMatchingElementByAccessor: Function that processes the array with the mapping function and handler
  // - getConfiguredIteratee: Function that wraps the mapping function with arity 2
  // - IH: Handler function used by findMatchingElementByAccessor
  // - mapInteractionsToRoutes: Fallback result when inputArray is empty

  // Check if the input array exists and has elements
  if (inputArray && inputArray.length) {
    // Process the array with the mapping function (wrapped by getConfiguredIteratee) and handler
    return findMatchingElementByAccessor(inputArray, getConfiguredIteratee(mappingFunction, 2), IH);
  } else {
    // Return the fallback result if the array is empty or undefined
    return mapInteractionsToRoutes;
  }
}

module.exports = processArrayWithMapperOrFallback;