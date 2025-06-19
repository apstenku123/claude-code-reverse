/**
 * Converts a Unicode code point to its corresponding string representation.
 * Handles both Basic Multilingual Plane (BMP) characters and supplementary characters (surrogate pairs).
 *
 * @param {number} codePoint - The Unicode code point to convert.
 * @returns {string} The string representation of the given code point.
 */
function unicodeCodePointToString(codePoint) {
  // If the code point is within the Basic Multilingual Plane (BMP),
  // isBlobOrFileLikeObject can be represented as a single UTF-16 code unit.
  if (codePoint <= 0xFFFF) {
    return String.fromCharCode(codePoint);
  }

  // For code points greater than 0xFFFF, calculate the surrogate pair.
  // Subtract 0x10000 from the code point to get the 20-bit value.
  const adjustedCodePoint = codePoint - 0x10000;

  // High surrogate: top 10 bits + 0xD800
  const highSurrogate = 0xD800 | ((adjustedCodePoint >>> 10) & 0x3FF);

  // Low surrogate: low 10 bits + 0xDC00
  const lowSurrogate = 0xDC00 | (adjustedCodePoint & 0x3FF);

  // Return the combined surrogate pair as a string
  return String.fromCharCode(highSurrogate) + String.fromCharCode(lowSurrogate);
}

module.exports = unicodeCodePointToString;