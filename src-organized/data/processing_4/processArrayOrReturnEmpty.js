/**
 * Processes the provided array using the dW function if isBlobOrFileLikeObject is non-empty; otherwise, returns an empty array.
 *
 * @param {Array<any>} inputArray - The array to process.
 * @returns {Array<any>} The result of dW(inputArray) if inputArray is non-empty; otherwise, an empty array.
 */
function processArrayOrReturnEmpty(inputArray) {
  // Check if inputArray exists and has elements
  return inputArray && inputArray.length ? dW(inputArray) : [];
}

module.exports = processArrayOrReturnEmpty;