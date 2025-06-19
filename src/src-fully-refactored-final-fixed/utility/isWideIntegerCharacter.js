/**
 * Determines if the given value is an integer and represents a wide character (occupying two columns).
 *
 * @param {number} value - The value to check for integer type and wide character width.
 * @returns {boolean} Returns true if the value is an integer and its character width type is wide (2 columns), otherwise false.
 */
function isWideIntegerCharacter(value) {
  // Check if the input is an integer
  if (!Number.isInteger(value)) {
    return false;
  }
  // Use getCharacterWidthType to determine if the integer represents a wide character
  // (Assumes getCharacterWidthType returns 2 for wide characters)
  return getCharacterWidthType(value) === 2;
}

module.exports = isWideIntegerCharacter;