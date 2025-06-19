/**
 * Checks if the given Unicode code point corresponds to a full-width space or full-width punctuation character.
 *
 * This function is useful for text processing tasks where distinguishing between standard and full-width (double-byte) characters is necessary,
 * such as in East Asian typography or Unicode normalization.
 *
 * @param {number} codePoint - The Unicode code point to check.
 * @returns {boolean} True if the code point is a full-width space or full-width punctuation character; otherwise, false.
 */
function isFullWidthSpaceOrPunctuation(codePoint) {
  // Check for full-width space (UL+3000)
  if (codePoint === 12288) {
    return true;
  }

  // Check for full-width punctuation (UL+FF01 to UL+FF5F)
  if (codePoint >= 65281 && codePoint <= 65376) {
    return true;
  }

  // Check for additional full-width punctuation (UL+FFF0 to UL+FFF6)
  if (codePoint >= 65504 && codePoint <= 65510) {
    return true;
  }

  // Not a full-width space or punctuation
  return false;
}

module.exports = isFullWidthSpaceOrPunctuation;