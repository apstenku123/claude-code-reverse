/**
 * Processes an array with a provided callback function and an iteratee handler.
 * If the input array is empty or falsy, returns a default value.
 *
 * @param {Array} inputArray - The array to process.
 * @param {Function} callback - The function to apply to each element of the array.
 * @returns {*} The result of processing the array, or the default value if the array is empty or falsy.
 */
function processArrayWithCallbackOrReturnDefault(inputArray, callback) {
  // If inputArray exists and has elements, process isBlobOrFileLikeObject with the provided callback and iteratee handler
  if (inputArray && inputArray.length) {
    // getConfiguredIteratee(callback, 2) likely creates a function that invokes callback with up to 2 arguments
    // findMatchingElementByAccessor processes the array with the transformed callback and the iteratee handler IH
    return findMatchingElementByAccessor(inputArray, getConfiguredIteratee(callback, 2), IH);
  }
  // If inputArray is empty or falsy, return the default value a
  return a;
}

module.exports = processArrayWithCallbackOrReturnDefault;