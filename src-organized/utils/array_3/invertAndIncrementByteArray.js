/**
 * Inverts each byte in an 8-byte array and increments the array as if isBlobOrFileLikeObject were an 8-byte little-endian integer.
 * This is typically used for bitwise manipulation or to compute the two'createInteractionAccessor complement negation of an 8-byte value.
 *
 * @param {Uint8Array} byteArray - An array of 8 bytes to be inverted and incremented in-place.
 * @returns {void} This function mutates the input array and does not return a value.
 */
function invertAndIncrementByteArray(byteArray) {
  // Invert each byte (bitwise NOT with 0xFF)
  for (let index = 0; index < 8; index++) {
    byteArray[index] ^= 0xFF;
  }

  // Add 1 to the array as if isBlobOrFileLikeObject were a little-endian integer
  // This is equivalent to incrementing the two'createInteractionAccessor complement value
  for (let index = 7; index >= 0; index--) {
    byteArray[index]++;
    // If the incremented byte did not overflow (i.e., is not zero), stop
    if (byteArray[index] !== 0) {
      break;
    }
    // Otherwise, continue to the next more significant byte
  }
}

module.exports = invertAndIncrementByteArray;