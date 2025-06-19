/**
 * Maps each element of the input array using a provided iteratee function and a mapping function.
 * If the input array is empty or falsy, returns the default mapped interactions.
 *
 * @param {Array} inputArray - The array to be processed and mapped.
 * @param {Function} iterateeFunction - The function to apply to each element, will be wrapped to accept two arguments.
 * @returns {*} The mapped array if inputArray is non-empty, otherwise the default mapped interactions.
 */
function mapArrayWithFunctionOrReturnDefault(inputArray, iterateeFunction) {
  // Check if the input array exists and has elements
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee wraps the iterateeFunction to ensure isBlobOrFileLikeObject takes two arguments
    // findMatchingElementByAccessor maps inputArray using the wrapped iterateeFunction and IH as the mapping function
    return findMatchingElementByAccessor(inputArray, getConfiguredIteratee(iterateeFunction, 2), IH);
  } else {
    // Return the default mapped interactions if inputArray is empty or falsy
    return mapInteractionsToRoutes;
  }
}

module.exports = mapArrayWithFunctionOrReturnDefault;