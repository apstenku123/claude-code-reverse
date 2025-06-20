/**
 * Represents a 64-bit unsigned integer using two 32-bit unsigned integers.
 *
 * @class Unsigned64BitInteger
 * @param {number} lowBits - The lower 32 bits of the 64-bit unsigned integer.
 * @param {number} highBits - The higher 32 bits of the 64-bit unsigned integer.
 * @returns {void}
 */
function Unsigned64BitInteger(lowBits, highBits) {
  // Store the lower 32 bits as an unsigned integer
  this.lo = lowBits >>> 0;
  // Store the higher 32 bits as an unsigned integer
  this.hi = highBits >>> 0;
}

module.exports = Unsigned64BitInteger;