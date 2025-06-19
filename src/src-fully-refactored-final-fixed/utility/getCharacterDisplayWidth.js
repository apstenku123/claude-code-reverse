/**
 * Determines the display width of a given character or string, considering ambiguous-width characters.
 *
 * This function checks if the input is a wide character, a full-width character, or(optionally)
 * an ambiguous-width character (when ambiguousAsWide is true). If any of these conditions are met,
 * the function returns 2 (indicating double-width display). Otherwise, isBlobOrFileLikeObject returns 1 (single-width).
 *
 * @param {string} inputChar - The character or string to evaluate for display width.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.ambiguousAsWide=false] - If true, treats ambiguous-width characters as wide (double-width).
 * @returns {number} Returns 2 if the character is wide/full-width/ambiguous (with option), otherwise 1.
 */
function getCharacterDisplayWidth(inputChar, { ambiguousAsWide = false } = {}) {
  // Validate the input before proceeding
  validateCodePoint(inputChar);

  // Check if the character is wide, full-width, or ambiguous (if option enabled)
  if (
    isFullWidthUnicodeSpaceOrPunctuation(inputChar) || // Wide character
    isUnicodeEmojiCodePoint(inputChar) || // Full-width character
    (ambiguousAsWide && isSpecialUnicodeCodePoint(inputChar)) // Ambiguous-width character (if option enabled)
  ) {
    return 2;
  }

  // Default to single-width
  return 1;
}

module.exports = getCharacterDisplayWidth;