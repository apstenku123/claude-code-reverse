/**
 * Reads a 64-bit varint from the buffer at the current position.
 * Supports reading from a buffer with possible split between low and high 32 bits.
 * Throws an error if the encoding is invalid or if the buffer ends prematurely.
 *
 * @returns {kL0} An object representing the 64-bit integer, with 'lo' and 'hi' properties.
 * @throws {Error} If the varint encoding is invalid or if the buffer ends unexpectedly.
 */
function readVarint64FromBuffer() {
  // Create a new 64-bit integer object (lo: low 32 bits, hi: high 32 bits)
  const result = new kL0(0, 0);
  let byteIndex = 0;

  // Fast path: if there are more than 4 bytes left in the buffer
  if (this.len - this.pos > 4) {
    // Read up to 4 bytes for the low 32 bits
    for (; byteIndex < 4; ++byteIndex) {
      // Read next byte and add its 7 bits to the result
      result.lo = (result.lo | (this.buf[this.pos] & 0x7F) << (byteIndex * 7)) >>> 0;
      // If MSB is not set, varint ends here
      if (this.buf[this.pos++] < 128) return result;
    }
    // 5th byte: finish low 32 bits and start high 32 bits
    result.lo = (result.lo | (this.buf[this.pos] & 0x7F) << 28) >>> 0;
    result.hi = (result.hi | (this.buf[this.pos] & 0x7F) >> 4) >>> 0;
    if (this.buf[this.pos++] < 128) return result;
    byteIndex = 0; // Reset for high bits
  } else {
    // Slow path: not enough bytes left, check for buffer overrun
    for (; byteIndex < 3; ++byteIndex) {
      if (this.pos >= this.len) throw fV(this);
      result.lo = (result.lo | (this.buf[this.pos] & 0x7F) << (byteIndex * 7)) >>> 0;
      if (this.buf[this.pos++] < 128) return result;
    }
    // Last byte for low bits
    result.lo = (result.lo | (this.buf[this.pos++] & 0x7F) << (byteIndex * 7)) >>> 0;
    return result;
  }

  // Now read high 32 bits
  if (this.len - this.pos > 4) {
    for (; byteIndex < 5; ++byteIndex) {
      result.hi = (result.hi | (this.buf[this.pos] & 0x7F) << (byteIndex * 7 + 3)) >>> 0;
      if (this.buf[this.pos++] < 128) return result;
    }
  } else {
    for (; byteIndex < 5; ++byteIndex) {
      if (this.pos >= this.len) throw fV(this);
      result.hi = (result.hi | (this.buf[this.pos] & 0x7F) << (byteIndex * 7 + 3)) >>> 0;
      if (this.buf[this.pos++] < 128) return result;
    }
  }

  throw Error("invalid varint encoding");
}

module.exports = readVarint64FromBuffer;