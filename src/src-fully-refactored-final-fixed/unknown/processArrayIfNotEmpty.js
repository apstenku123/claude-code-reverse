/**
 * Processes the input array using the dW function if isBlobOrFileLikeObject is non-empty; otherwise, returns an empty array.
 *
 * @param {Array<any>} inputArray - The array to be processed.
 * @returns {Array<any>} The result of dW(inputArray) if inputArray is non-empty; otherwise, an empty array.
 */
function processArrayIfNotEmpty(inputArray) {
  // Check if the input array exists and has at least one element
  if (inputArray && inputArray.length) {
    // Process the array using the external dW function
    return dW(inputArray);
  }
  // Return an empty array if inputArray is null, undefined, or empty
  return [];
}

module.exports = processArrayIfNotEmpty;