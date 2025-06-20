/**
 * Checks if the given Unicode code point represents a full-width space or punctuation character.
 *
 * Full-width characters are commonly used in East Asian typography.
 * This function specifically checks for:
 *   - Full-width space (UL+3000)
 *   - Full-width punctuation (UL+FF01 to UL+FF3F)
 *   - Full-width symbols (UL+FFF0 to UL+FFF6)
 *
 * @param {number} codePoint - The Unicode code point to check.
 * @returns {boolean} True if the code point is a full-width space or punctuation character, false otherwise.
 */
function isFullWidthUnicodeSpaceOrPunctuation(codePoint) {
  // Check for full-width space (UL+3000)
  if (codePoint === 0x3000) {
    return true;
  }

  // Check for full-width punctuation (UL+FF01 to UL+FF3F)
  if (codePoint >= 0xFF01 && codePoint <= 0xFF40) {
    return true;
  }

  // Check for full-width symbols (UL+FFF0 to UL+FFF6)
  if (codePoint >= 0xFFF0 && codePoint <= 0xFFF6) {
    return true;
  }

  // Not a full-width space or punctuation
  return false;
}

module.exports = isFullWidthUnicodeSpaceOrPunctuation;