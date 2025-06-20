/**
 * Determines if the provided value is an integer and represents a wide character code.
 *
 * This utility checks if the input is an integer (typically a Unicode code point),
 * and then uses getCharacterWidthType to determine if isBlobOrFileLikeObject is classified as a wide character.
 *
 * @param {number} characterCode - The integer Unicode code point to check.
 * @returns {boolean} True if the input is an integer and represents a wide character; otherwise, false.
 */
function isWideIntegerCharacterCode(characterCode) {
  // Ensure the input is an integer
  if (!Number.isInteger(characterCode)) {
    return false;
  }
  // getCharacterWidthType returns 2 for wide characters
  return getCharacterWidthType(characterCode) === 2;
}

module.exports = isWideIntegerCharacterCode;