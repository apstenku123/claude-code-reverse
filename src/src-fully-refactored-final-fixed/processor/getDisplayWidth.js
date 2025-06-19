/**
 * Calculates the display width of a string, accounting for Unicode character widths, ANSI escape codes, and special cases.
 *
 * @param {string} inputString - The string whose display width is to be calculated.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.ambiguousIsNarrow=true] - Treat ambiguous-width characters as narrow (1 column) if true, or wide (2 columns) if false.
 * @param {boolean} [options.countAnsiEscapeCodes=false] - If true, include ANSI escape codes in the width calculation.
 * @returns {number} The calculated display width of the input string.
 */
function getDisplayWidth(inputString, options = {}) {
  if (typeof inputString !== "string" || inputString.length === 0) {
    return 0;
  }

  // Destructure options with default values
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;

  // Remove ANSI escape codes unless instructed to count them
  let processedString = inputString;
  if (!countAnsiEscapeCodes) {
    processedString = removeSpecialPatternFromString(processedString);
  }

  if (processedString.length === 0) {
    return 0;
  }

  let totalWidth = 0;
  const widthOptions = {
    ambiguousAsWide: !ambiguousIsNarrow
  };

  // Iterate over grapheme segments in the string
  for (const { segment } of j_4.segment(processedString)) {
    const codePoint = segment.codePointAt(0);

    // Skip control characters (C0 and getThemeStylesheet)
    if (codePoint <= 31 || (codePoint >= 127 && codePoint <= 159)) {
      continue;
    }

    // Skip zero-width and invisible characters (e.g., ZWSP, ZWNJ, ZWJ, BOM)
    if ((codePoint >= 8203 && codePoint <= 8207) || codePoint === 65279) {
      continue;
    }

    // Skip combining marks and various non-spacing marks
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

    // Skip segments matching the k_4 regex (e.g., emoji modifiers)
    if (k_4.test(segment)) {
      continue;
    }

    // Double-width for segments matching the fQ0.default regex (e.g., fullwidth emoji)
    if (fQ0.default().test(segment)) {
      totalWidth += 2;
      continue;
    }

    // Use $createRefCountedMulticastOperator to determine width for all other characters
    totalWidth += $createRefCountedMulticastOperator(codePoint, widthOptions);
  }

  return totalWidth;
}

module.exports = getDisplayWidth;