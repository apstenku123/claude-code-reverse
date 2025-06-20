/**
 * Calculates the display width of a given string, accounting for Unicode properties, ANSI escape codes, and ambiguous-width characters.
 *
 * @param {string} inputString - The string whose display width is to be calculated.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.ambiguousIsNarrow=true] - If true, ambiguous-width characters are treated as narrow; otherwise, as wide.
 * @param {boolean} [options.countAnsiEscapeCodes=false] - If true, ANSI escape codes are counted in the width; otherwise, they are ignored.
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

  // Remove ANSI escape codes if not counting them
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

  // Iterate over grapheme segments in the string
  for (const { segment } of j_4.segment(processedString)) {
    const codePoint = segment.codePointAt(0);

    // Skip control characters (C0 and getThemeStylesheet)
    if (codePoint <= 31 || (codePoint >= 127 && codePoint <= 159)) continue;
    // Skip zero-width and invisible characters
    if ((codePoint >= 8203 && codePoint <= 8207) || codePoint === 65279) continue;
    // Skip combining diacritical marks and similar ranges
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
    // Skip segments matching the k_4 regex (e.g., emoji sequences)
    if (k_4.test(segment)) continue;
    // If segment matches the fQ0.default regex (e.g., fullwidth emoji), count as width 2
    if (fQ0.default().test(segment)) {
      totalWidth += 2;
      continue;
    }
    // Otherwise, use getCharacterWidthType to determine width
    totalWidth += $createRefCountedMulticastOperator(codePoint, widthOptions);
  }
  return totalWidth;
}

module.exports = getStringDisplayWidth;