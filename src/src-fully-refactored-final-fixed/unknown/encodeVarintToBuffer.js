/**
 * Encodes an integer value into a buffer using variable-length encoding (varint).
 * This is commonly used in protocols like Protocol Buffers to efficiently encode integers.
 * The function writes the encoded bytes into the provided buffer starting at the given offset.
 *
 * @param {number} value - The integer value to encode (non-negative integer).
 * @param {Uint8Array|number[]} buffer - The buffer (array) to write encoded bytes into.
 * @param {number} offset - The starting index in the buffer to write to.
 * @returns {void}
 */
function encodeVarintToBuffer(value, buffer, offset) {
  // Continue encoding while value is greater than 7 bits (127)
  while (value > 127) {
    // Write the lower 7 bits of value, set the continuation bit (0x80)
    buffer[offset++] = (value & 0x7F) | 0x80;
    // Logical right shift by 7 bits to process the next 7 bits
    value >>>= 7;
  }
  // Write the last byte (no continuation bit)
  buffer[offset] = value;
}

module.exports = encodeVarintToBuffer;