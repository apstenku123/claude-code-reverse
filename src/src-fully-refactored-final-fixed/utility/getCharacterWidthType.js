/**
 * Determines the width type of a given character or string based on various checks.
 *
 * @param {string} input - The character or string to check.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.ambiguousAsWide=false] - If true, treats ambiguous-width characters as wide.
 * @returns {number} Returns 2 if the input is wide (including ambiguous if specified), otherwise 1.
 */
function getCharacterWidthType(input, { ambiguousAsWide = false } = {}) {
  // Validate input (throws if invalid)
  validateCodePoint(input);

  // Check if input is full-width or wide
  if (isFullWidthUnicodeSpaceOrPunctuation(input) || isUnicodeEmojiCodePoint(input) || (ambiguousAsWide && isSpecialUnicodeCodePoint(input))) {
    return 2; // Wide character
  }

  return 1; // Narrow character
}

module.exports = getCharacterWidthType;