/**
 * Performs a bitwise XOR between elements of a source array and a 4-element mask array, storing the result in the target array at a specified offset.
 *
 * Each element in the source array is XORed with the corresponding element in the mask array, cycling through the mask every 4 elements.
 *
 * @param {Uint8Array} sourceArray - The array containing the source bytes to be XORed.
 * @param {Uint8Array} maskArray - The 4-byte mask array used for XOR operations (cycled every 4 elements).
 * @param {Uint8Array} targetArray - The array where the result will be stored.
 * @param {number} targetOffset - The starting index in the target array where results will be written.
 * @param {number} length - The number of bytes to process from the source array.
 * @returns {void}
 */
function xorArraysWithCyclicMask(sourceArray, maskArray, targetArray, targetOffset, length) {
  for (let index = 0; index < length; index++) {
    // XOR each source byte with the corresponding mask byte (cycled every 4 bytes)
    targetArray[targetOffset + index] = sourceArray[index] ^ maskArray[index & 3];
  }
}

module.exports = xorArraysWithCyclicMask;