/**
 * Writes a 32-bit integer value into a byte array in little-endian order at the specified offset.
 *
 * @param {number} intValue - The 32-bit integer value to write.
 * @param {Uint8Array|number[]} byteArray - The byte array where the integer will be written.
 * @param {number} offset - The starting index in the byte array to write the integer.
 * @returns {void}
 */
function writeInt32ToByteArray(intValue, byteArray, offset) {
  // Write the least significant byte
  byteArray[offset] = intValue & 0xFF;
  // Write the next byte (shift right by 8 bits)
  byteArray[offset + 1] = (intValue >>> 8) & 0xFF;
  // Write the next byte (shift right by 16 bits)
  byteArray[offset + 2] = (intValue >>> 16) & 0xFF;
  // Write the most significant byte (shift right by 24 bits)
  byteArray[offset + 3] = (intValue >>> 24) & 0xFF;
}

module.exports = writeInt32ToByteArray;