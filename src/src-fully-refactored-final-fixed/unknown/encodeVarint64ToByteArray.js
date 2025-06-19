/**
 * Encodes a 64-bit unsigned integer (represented as an object with 'hi' and 'lo' 32-bit properties)
 * into a variable-length byte array using the varint encoding scheme (as used in Protocol Buffers).
 *
 * @param {Object} uint64 - The 64-bit unsigned integer to encode. Should have 'hi' (high 32 bits) and 'lo' (low 32 bits) properties.
 * @param {Uint8Array} byteArray - The byte array to write the encoded bytes into.
 * @param {number} offset - The starting index in the byte array to write to.
 * @returns {void}
 *
 * The function mutates 'byteArray' by writing the encoded bytes starting at 'offset'.
 */
function encodeVarint64ToByteArray(uint64, byteArray, offset) {
  // Encode the high bits while they are non-zero
  while (uint64.hi) {
    // Write the lower 7 bits of 'lo', set the MSB to indicate more bytes follow
    byteArray[offset++] = (uint64.lo & 0x7F) | 0x80;
    // Shift 'lo' right by 7 bits, bring in 7 bits from 'hi' (shifted left by 25)
    uint64.lo = ((uint64.lo >>> 7) | (uint64.hi << 25)) >>> 0;
    // Shift 'hi' right by 7 bits
    uint64.hi >>>= 7;
  }
  // Encode the remaining bits of 'lo' if greater than 127
  while (uint64.lo > 127) {
    // Write the lower 7 bits, set MSB
    byteArray[offset++] = (uint64.lo & 0x7F) | 0x80;
    // Shift 'lo' right by 7 bits
    uint64.lo >>>= 7;
  }
  // Write the last byte (MSB not set)
  byteArray[offset++] = uint64.lo;
}

module.exports = encodeVarint64ToByteArray;