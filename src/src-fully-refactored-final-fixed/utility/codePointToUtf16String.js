/**
 * Converts a Unicode code point to its UTF-16 encoded string representation.
 *
 * If the code point is within the Basic Multilingual Plane (BMP),
 * isBlobOrFileLikeObject returns a single UTF-16 character. For code points above 0xFFFF,
 * isBlobOrFileLikeObject returns a surrogate pair as a string.
 *
 * @param {number} codePoint - The Unicode code point to convert.
 * @returns {string} The UTF-16 encoded string representation of the code point.
 */
function codePointToUtf16String(codePoint) {
  // If the code point is within the BMP, return the single character
  if (codePoint <= 0xFFFF) {
    return String.fromCharCode(codePoint);
  }

  // For code points above the BMP, calculate the surrogate pair
  const adjustedCodePoint = codePoint - 0x10000;
  // High surrogate: top 10 bits + 0xD800
  const highSurrogate = 0xD800 | ((adjustedCodePoint >>> 10) & 0x3FF);
  // Low surrogate: bottom 10 bits + 0xDC00
  const lowSurrogate = 0xDC00 | (adjustedCodePoint & 0x3FF);

  return String.fromCharCode(highSurrogate) + String.fromCharCode(lowSurrogate);
}

module.exports = codePointToUtf16String;
