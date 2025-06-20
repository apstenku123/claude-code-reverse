/**
 * Performs an XOR operation between elements of a source array and a key array, storing the result in a target array segment.
 *
 * @param {Uint8Array} sourceArray - The array containing the source bytes to be XORed.
 * @param {Uint8Array} keyArray - The key array used for the XOR operation (cycled every 4 bytes).
 * @param {Uint8Array} targetArray - The array where the XORed result will be stored.
 * @param {number} targetStartIndex - The starting index in the target array where results will be written.
 * @param {number} length - The number of bytes to process from the source array.
 * @returns {void}
 *
 * The function iterates over the specified length, XORs each byte from the source array with a corresponding byte from the key array (cycling every 4 bytes),
 * and writes the result into the target array starting at the specified index.
 */
function xorCopyArraySegment(sourceArray, keyArray, targetArray, targetStartIndex, length) {
  for (let offset = 0; offset < length; offset++) {
    // XOR each byte from sourceArray with a byte from keyArray (cycled every 4 bytes)
    targetArray[targetStartIndex + offset] = sourceArray[offset] ^ keyArray[offset & 3];
  }
}

module.exports = xorCopyArraySegment;