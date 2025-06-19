/**
 * Processes an array using a provided callback and a handler function.
 * If the input array is empty or falsy, returns the default processInteractionEntries result.
 *
 * @param {Array} inputArray - The array to process.
 * @param {Function} callback - The function to apply to each element of the array. Will be wrapped by getConfiguredIteratee with arity 2.
 * @returns {*} The result of processing the array with findMatchingElementByAccessor and IH, or the result of processInteractionEntries if the array is empty/falsy.
 */
function processArrayWithCallback(inputArray, callback) {
  // Check if the input array exists and has elements
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee wraps the callback with arity 2 (possibly to ensure correct argument count)
    // findMatchingElementByAccessor processes the array with the wrapped callback and IH handler
    return findMatchingElementByAccessor(inputArray, getConfiguredIteratee(callback, 2), IH);
  } else {
    // If the array is empty or falsy, return the default processInteractionEntries result
    return processInteractionEntries;
  }
}

module.exports = processArrayWithCallback;