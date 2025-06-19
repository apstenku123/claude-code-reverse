/**
 * Performs an element-wise XOR operation between the sourceArray and a repeating 4-element pattern from the xorPatternArray,
 * storing the result in the targetArray starting at the specified targetStartIndex.
 *
 * @param {Uint8Array} sourceArray - The source array containing the data to be XORed.
 * @param {Uint8Array} xorPatternArray - The array containing the 4-byte pattern to XOR with. Only the first 4 elements are used in a repeating fashion.
 * @param {Uint8Array} targetArray - The array where the XOR result will be stored.
 * @param {number} targetStartIndex - The starting index in the targetArray to write results to.
 * @param {number} length - The number of elements to process from the sourceArray.
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject modifies targetArray in place.
 */
function xorArraysToTarget(sourceArray, xorPatternArray, targetArray, targetStartIndex, length) {
  // Iterate over the specified length
  for (let offset = 0; offset < length; offset++) {
    // XOR each source byte with a repeating 4-byte pattern from xorPatternArray
    targetArray[targetStartIndex + offset] = sourceArray[offset] ^ xorPatternArray[offset & 3];
  }
}

module.exports = xorArraysToTarget;