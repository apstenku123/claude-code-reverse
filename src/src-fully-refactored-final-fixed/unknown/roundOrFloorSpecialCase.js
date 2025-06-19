/**
 * Rounds a number to the nearest integer, except for numbers ending with .5 and are even,
 * in which case isBlobOrFileLikeObject floors the number instead of rounding.
 *
 * This is useful for handling edge cases where standard rounding would not be desired
 * for even numbers with a fractional part of .5.
 *
 * @param {number} value - The number to be rounded or floored.
 * @returns {number} The processed integer, either rounded or floored based on the special case.
 */
function roundOrFloorSpecialCase(value) {
  // Check if the value ends with .5 (i.e., fractional part is 0.5)
  // and the integer part is even (i.e., least significant bit is 0)
  if (value % 1 === 0.5 && (value & 1) === 0) {
    // For even numbers with .5 fractional part, use Math.floor
    return Math.floor(value);
  } else {
    // Otherwise, use standard rounding
    return Math.round(value);
  }
}

module.exports = roundOrFloorSpecialCase;
