/**
 * Determines if the provided code point represents a wide character.
 *
 * a wide character is defined as one that occupies two columns in monospace fonts (e.g., many East Asian characters).
 * This function first checks if the input is a valid integer code point, then delegates to getCharacterWidthType
 * to determine the width type. Returns true if the code point is wide (width type === 2), false otherwise.
 *
 * @param {number} codePoint - The Unicode code point to check.
 * @returns {boolean} True if the code point is a wide character, false otherwise.
 */
function isWideCharacterCodePoint(codePoint) {
  // Ensure the input is an integer (valid Unicode code point)
  if (!Number.isInteger(codePoint)) {
    return false;
  }

  // getCharacterWidthType returns 2 for wide characters
  return getCharacterWidthType(codePoint) === 2;
}

module.exports = isWideCharacterCodePoint;