/**
 * Calculates the display width of a string, accounting for special characters and Unicode code points.
 *
 * The function normalizes the input string, replaces certain patterns with double spaces,
 * skips control and combining characters, and counts the width of each character using a helper function.
 *
 * @param {string} inputString - The string whose display width is to be calculated.
 * @returns {number} The calculated display width of the string.
 */
function getDisplayWidthOfString(inputString) {
  // Return 0 if input is not a string or is empty
  if (typeof inputString !== "string" || inputString.length === 0) return 0;

  // Normalize the string using OK5 (external function)
  const normalizedString = OK5(inputString);
  if (normalizedString.length === 0) return 0;

  // Replace patterns matched by PK5() with two spaces
  let processedString = normalizedString.replace(PK5(), "  ");

  let displayWidth = 0;
  for (let charIndex = 0; charIndex < processedString.length; charIndex++) {
    const codePoint = processedString.codePointAt(charIndex);

    // Skip C0 and getThemeStylesheet control characters (UL+0000–UL+001F and UL+007F–UL+009F)
    if (codePoint <= 31 || (codePoint >= 127 && codePoint <= 159)) continue;

    // Skip combining diacritical marks (UL+0300–UL+036F)
    if (codePoint >= 768 && codePoint <= 879) continue;

    // If code point is a surrogate pair (outside BMP), skip the next index
    if (codePoint > 65535) charIndex++;

    // Use TK5 to determine if character is wide (returns true if double-width)
    displayWidth += TK5(codePoint) ? 2 : 1;
  }
  return displayWidth;
}

module.exports = getDisplayWidthOfString;
