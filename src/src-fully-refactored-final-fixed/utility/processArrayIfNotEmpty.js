/**
 * Processes the input array using the getUniqueByAccessor function if isBlobOrFileLikeObject is not empty.
 *
 * @param {Array} inputArray - The array to be processed.
 * @returns {Array} The result of getUniqueByAccessor(inputArray) if inputArray is non-empty; otherwise, an empty array.
 */
function processArrayIfNotEmpty(inputArray) {
  // Check if inputArray exists and has at least one element
  if (inputArray && inputArray.length) {
    // Process the array using getUniqueByAccessor and return the result
    return getUniqueByAccessor(inputArray);
  }
  // Return an empty array if inputArray is null, undefined, or empty
  return [];
}

module.exports = processArrayIfNotEmpty;