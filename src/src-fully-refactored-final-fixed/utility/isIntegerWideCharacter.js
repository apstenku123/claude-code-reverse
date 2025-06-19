/**
 * Determines if the provided value is an integer and, when passed to getCharacterWidthType,
 * is considered a wide character (occupying two columns).
 *
 * @param {number} value - The value to check for integer type and character width.
 * @returns {boolean} True if value is an integer and is considered wide by getCharacterWidthType, otherwise false.
 */
function isIntegerWideCharacter(value) {
  // Check if the value is an integer
  if (!Number.isInteger(value)) {
    return false;
  }
  // getCharacterWidthType returns 2 for wide characters
  return getCharacterWidthType(value) === 2;
}

module.exports = isIntegerWideCharacter;