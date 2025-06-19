/**
 * Processes an input array by applying a mapping function and an iteratee function.
 * If the input array is empty or undefined, returns the result of mapInteractionsToRoutes.
 *
 * @param {Array} inputArray - The array to process.
 * @param {Function} mappingFunction - The function to apply to each element (will be wrapped by getConfiguredIteratee with arity 2).
 * @returns {*} The result of findMatchingElementByAccessor if inputArray is non-empty, otherwise the result of mapInteractionsToRoutes.
 */
function processArrayWithMapping(inputArray, mappingFunction) {
  // Check if the input array exists and has elements
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee wraps the mappingFunction to ensure arity of 2
    // findMatchingElementByAccessor processes the array with the mapped function and i8 as the iteratee
    return findMatchingElementByAccessor(inputArray, getConfiguredIteratee(mappingFunction, 2), i8);
  } else {
    // If inputArray is empty or undefined, return the default mapping
    return mapInteractionsToRoutes;
  }
}

module.exports = processArrayWithMapping;