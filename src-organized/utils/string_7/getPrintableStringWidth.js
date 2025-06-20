/**
 * Calculates the printable width of a string, accounting for special Unicode characters and double-width characters.
 *
 * - Trims the string using OK5, replaces patterns matched by PK5 with two spaces.
 * - Ignores control characters, non-printable Unicode ranges, and combining marks.
 * - Counts double-width characters (as determined by TK5) as width 2, others as width 1.
 *
 * @param {string} inputString - The string whose printable width is to be calculated.
 * @returns {number} The total printable width of the string.
 */
function getPrintableStringWidth(inputString) {
  // Return 0 for non-string or empty input
  if (typeof inputString !== "string" || inputString.length === 0) return 0;

  // Trim or normalize the string using OK5
  let normalizedString = OK5(inputString);
  if (normalizedString.length === 0) return 0;

  // Replace matched patterns (e.g., ANSI escape codes) with two spaces
  normalizedString = normalizedString.replace(PK5(), "  ");

  let width = 0;
  for (let index = 0; index < normalizedString.length; index++) {
    const codePoint = normalizedString.codePointAt(index);

    // Skip control characters (UL+0000 to UL+001F, UL+007F to UL+009F)
    if (codePoint <= 31 || (codePoint >= 127 && codePoint <= 159)) continue;

    // Skip combining marks (UL+0300 to UL+036F)
    if (codePoint >= 768 && codePoint <= 879) continue;

    // If codePoint is a surrogate pair (outside BMP), advance index by one extra
    if (codePoint > 65535) index++;

    // Use TK5 to determine if character is double-width
    width += TK5(codePoint) ? 2 : 1;
  }
  return width;
}

module.exports = getPrintableStringWidth;
