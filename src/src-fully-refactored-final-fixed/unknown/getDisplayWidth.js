/**
 * Calculates the display width of a string, accounting for Unicode, ANSI escape codes, and ambiguous-width characters.
 *
 * @param {string} inputString - The string whose display width should be calculated.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.ambiguousIsNarrow=true] - If true, treat ambiguous-width characters as narrow (width 1), otherwise as wide (width 2).
 * @param {boolean} [options.countAnsiEscapeCodes=false] - If true, include ANSI escape codes in the width calculation.
 * @returns {number} The calculated display width of the string.
 */
function getDisplayWidth(inputString, options = {}) {
  // Return 0 for non-string or empty input
  if (typeof inputString !== "string" || inputString.length === 0) return 0;

  // Destructure options with defaults
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;

  // Remove ANSI escape codes unless explicitly counting them
  let processedString = inputString;
  if (!countAnsiEscapeCodes) {
    processedString = removeSpecialPatternFromString(processedString);
  }
  if (processedString.length === 0) return 0;

  let totalWidth = 0;
  // Option for ambiguous-width characters
  const widthOptions = {
    ambiguousAsWide: !ambiguousIsNarrow
  };

  // Iterate over Unicode segments (grapheme clusters)
  for (const { segment } of i_4.segment(processedString)) {
    const codePoint = segment.codePointAt(0);

    // Skip control characters (C0 and getThemeStylesheet)
    if (codePoint <= 31 || (codePoint >= 127 && codePoint <= 159)) continue;
    // Skip zero-width characters (ZWSP, ZWNJ, ZWJ, BOM)
    if ((codePoint >= 8203 && codePoint <= 8207) || codePoint === 65279) continue;
    // Skip combining diacritical marks
    if ((codePoint >= 768 && codePoint <= 879) ||
        (codePoint >= 6832 && codePoint <= 6911) ||
        (codePoint >= 7616 && codePoint <= 7679) ||
        (codePoint >= 8400 && codePoint <= 8447) ||
        (codePoint >= 65056 && codePoint <= 65071)) continue;
    // Skip surrogate pairs
    if (codePoint >= 55296 && codePoint <= 57343) continue;
    // Skip variation selectors
    if (codePoint >= 65024 && codePoint <= 65039) continue;
    // Skip segments matching the n_4 regex (e.g., emoji modifiers)
    if (n_4.test(segment)) continue;
    // If segment matches oQ0.default() regex (e.g., fullwidth/emoji), count as width 2
    if (oQ0.default().test(segment)) {
      totalWidth += 2;
      continue;
    }
    // Otherwise, use $createRefCountedMulticastOperator to determine width
    totalWidth += $createRefCountedMulticastOperator(codePoint, widthOptions);
  }
  return totalWidth;
}

module.exports = getDisplayWidth;