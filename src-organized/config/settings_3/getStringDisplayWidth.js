/**
 * Calculates the display width of a string, accounting for Unicode, ANSI escape codes, and ambiguous-width characters.
 *
 * @param {string} inputString - The string whose display width should be calculated.
 * @param {Object} [options={}] - Configuration options.
 * @param {boolean} [options.ambiguousIsNarrow=true] - Treat ambiguous-width characters as narrow (1 column) if true, wide (2 columns) if false.
 * @param {boolean} [options.countAnsiEscapeCodes=false] - If true, include ANSI escape codes in the width calculation.
 * @returns {number} The calculated display width of the string.
 */
function getStringDisplayWidth(inputString, options = {}) {
  // Return 0 for non-string or empty input
  if (typeof inputString !== "string" || inputString.length === 0) return 0;

  // Destructure options with defaults
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;

  // Remove ANSI escape codes unless instructed to count them
  let processedString = inputString;
  if (!countAnsiEscapeCodes) {
    processedString = removeSpecialPatternFromString(processedString); // removeSpecialPatternFromString presumably strips ANSI codes
  }
  if (processedString.length === 0) return 0;

  let totalWidth = 0;
  const widthOptions = {
    ambiguousAsWide: !ambiguousIsNarrow // Invert logic for compatibility with $createRefCountedMulticastOperator
  };

  // Iterate over Unicode grapheme segments
  for (const { segment } of i_4.segment(processedString)) {
    const codePoint = segment.codePointAt(0);

    // Skip control characters (C0 and getThemeStylesheet)
    if (codePoint <= 31 || (codePoint >= 127 && codePoint <= 159)) continue;

    // Skip zero-width and BOM characters
    if ((codePoint >= 8203 && codePoint <= 8207) || codePoint === 65279) continue;

    // Skip combining marks (various Unicode ranges)
    if (
      (codePoint >= 768 && codePoint <= 879) ||
      (codePoint >= 6832 && codePoint <= 6911) ||
      (codePoint >= 7616 && codePoint <= 7679) ||
      (codePoint >= 8400 && codePoint <= 8447) ||
      (codePoint >= 65056 && codePoint <= 65071)
    ) continue;

    // Skip surrogate pairs
    if (codePoint >= 55296 && codePoint <= 57343) continue;

    // Skip variation selectors
    if (codePoint >= 65024 && codePoint <= 65039) continue;

    // Skip segments matching n_4 regex (likely zero-width joiners, etc.)
    if (n_4.test(segment)) continue;

    // If matches oQ0.default() regex (likely double-width), count as width 2
    if (oQ0.default().test(segment)) {
      totalWidth += 2;
      continue;
    }

    // Otherwise, use $createRefCountedMulticastOperator to determine width
    totalWidth += $createRefCountedMulticastOperator(codePoint, widthOptions);
  }

  return totalWidth;
}

module.exports = getStringDisplayWidth;