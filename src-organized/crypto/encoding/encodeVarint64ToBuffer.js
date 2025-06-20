/**
 * Encodes a 64-bit unsigned integer (represented as an object with 'hi' and 'lo' 32-bit properties)
 * into a buffer using variable-length encoding (varint), starting at the specified offset.
 * This is commonly used in binary serialization formats such as Protocol Buffers.
 *
 * @param {Object} uint64 - The 64-bit unsigned integer to encode, with properties:
 *   {number} hi - High 32 bits
 *   {number} lo - Low 32 bits
 * @param {Uint8Array|number[]} buffer - The buffer to write the encoded bytes into
 * @param {number} offset - The starting index in the buffer to write to
 * @returns {void}
 */
function encodeVarint64ToBuffer(uint64, buffer, offset) {
  // Encode the high 32 bits if present
  while (uint64.hi) {
    // Write 7 bits from the low part and set the continuation bit
    buffer[offset++] = (uint64.lo & 0x7F) | 0x80;
    // Shift right by 7 bits, carrying over bits from hi to lo
    uint64.lo = ((uint64.lo >>> 7) | (uint64.hi << 25)) >>> 0;
    uint64.hi >>>= 7;
  }
  // Encode the remaining low 32 bits
  while (uint64.lo > 0x7F) {
    // Write 7 bits and set the continuation bit
    buffer[offset++] = (uint64.lo & 0x7F) | 0x80;
    uint64.lo = uint64.lo >>> 7;
  }
  // Write the last byte (no continuation bit)
  buffer[offset++] = uint64.lo;
}

module.exports = encodeVarint64ToBuffer;