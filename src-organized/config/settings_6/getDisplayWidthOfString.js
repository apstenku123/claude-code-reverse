/**
 * Calculates the display width of a string, accounting for Unicode character widths, optional ANSI escape code removal, and ambiguous character handling.
 *
 * @param {string} inputString - The string whose display width is to be calculated.
 * @param {Object} [options={}] - Configuration options.
 * @param {boolean} [options.ambiguousIsNarrow=true] - If true, ambiguous-width characters are treated as narrow (width 1). If false, they are treated as wide (width 2).
 * @param {boolean} [options.countAnsiEscapeCodes=false] - If true, ANSI escape codes are counted in the width. If false, they are removed before calculation.
 * @returns {number} The calculated display width of the input string.
 */
function getDisplayWidthOfString(inputString, options = {}) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return 0;
  }

  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;

  // Remove ANSI escape codes if not counting them
  let processedString = countAnsiEscapeCodes ? inputString : removeSpecialPatternFromString(inputString);
  if (processedString.length === 0) {
    return 0;
  }

  let totalWidth = 0;
  const widthOptions = {
    ambiguousAsWide: !ambiguousIsNarrow
  };

  // Iterate over grapheme clusters (segments)
  for (const { segment } of j_4.segment(processedString)) {
    const codePoint = segment.codePointAt(0);

    // Skip control characters (C0 and getThemeStylesheet)
    if (codePoint <= 31 || (codePoint >= 127 && codePoint <= 159)) {
      continue;
    }
    // Skip zero-width and invisible characters
    if ((codePoint >= 8203 && codePoint <= 8207) || codePoint === 65279) {
      continue;
    }
    // Skip combining diacritical marks and similar ranges
    if (
      (codePoint >= 768 && codePoint <= 879) ||
      (codePoint >= 6832 && codePoint <= 6911) ||
      (codePoint >= 7616 && codePoint <= 7679) ||
      (codePoint >= 8400 && codePoint <= 8447) ||
      (codePoint >= 65056 && codePoint <= 65071)
    ) {
      continue;
    }
    // Skip surrogate pairs
    if (codePoint >= 55296 && codePoint <= 57343) {
      continue;
    }
    // Skip variation selectors
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    // Skip segments matching the k_4 regex (e.g., emoji sequences)
    if (k_4.test(segment)) {
      continue;
    }
    // If segment matches the fQ0.default regex (e.g., fullwidth/emoji), count as width 2
    if (fQ0.default().test(segment)) {
      totalWidth += 2;
      continue;
    }
    // Otherwise, determine width using $createRefCountedMulticastOperator(likely wcwidth-like function)
    totalWidth += $createRefCountedMulticastOperator(codePoint, widthOptions);
  }

  return totalWidth;
}

module.exports = getDisplayWidthOfString;