/**
 * Represents a 64-bit unsigned integer using two 32-bit unsigned integers (low and high parts).
 * Useful for environments where native 64-bit integers are not available.
 *
 * @class UnsignedInt64
 * @param {number} lowBits - The lower 32 bits of the 64-bit unsigned integer.
 * @param {number} highBits - The higher 32 bits of the 64-bit unsigned integer.
 */
function UnsignedInt64(lowBits, highBits) {
  // Ensure both parts are treated as unsigned 32-bit integers
  this.low = lowBits >>> 0;
  this.high = highBits >>> 0;
}

module.exports = UnsignedInt64;