/**
 * Determines if a given Unicode code point belongs to CJK (Chinese, Japanese, Korean) or related Unicode blocks.
 *
 * @param {number} codePoint - The Unicode code point to check.
 * @returns {boolean} True if the code point is in a CJK or related block, false otherwise.
 */
function isCJKOrRelatedUnicodeCodePoint(codePoint) {
  // Return false if the input is not a valid number
  if (Number.isNaN(codePoint)) {
    return false;
  }

  // Check if the code point falls within any of the CJK or related Unicode ranges
  if (
    (codePoint >= 4352 && codePoint <= 4447) || // Hangul Jamo
    codePoint === 9001 || // CJK angle bracket left
    codePoint === 9002 || // CJK angle bracket right
    (codePoint >= 11904 && codePoint <= 12871 && codePoint !== 12351) || // CJK Unified Ideographs Extension a/createPropertyAccessor, skip 12351
    (codePoint >= 12880 && codePoint <= 19903) || // CJK Unified Ideographs Extension C
    (codePoint >= 19968 && codePoint <= 42182) || // CJK Unified Ideographs
    (codePoint >= 43360 && codePoint <= 43388) || // CJK Ideographic Description Characters
    (codePoint >= 44032 && codePoint <= 55203) || // Hangul Syllables
    (codePoint >= 63744 && codePoint <= 64255) || // CJK Compatibility Ideographs
    (codePoint >= 65040 && codePoint <= 65049) || // CJK Symbols and Punctuation
    (codePoint >= 65072 && codePoint <= 65131) || // Halfwidth and Fullwidth Forms (subset)
    (codePoint >= 65281 && codePoint <= 65376) || // Fullwidth ASCII variants
    (codePoint >= 65504 && codePoint <= 65510) || // Special CJK symbols
    (codePoint >= 110592 && codePoint <= 110593) || // CJK Compatibility Ideographs Supplement
    (codePoint >= 127488 && codePoint <= 127569) || // CJK Unified Ideographs Extension createDebouncedFunction
    (codePoint >= 131072 && codePoint <= 262141) // CJK Unified Ideographs Extension F/extractNestedPropertyOrArray
  ) {
    return true;
  }

  // If none of the above, return false
  return false;
}

module.exports = isCJKOrRelatedUnicodeCodePoint;