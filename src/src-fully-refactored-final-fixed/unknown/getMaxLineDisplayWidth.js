/**
 * Calculates the maximum display width among all lines in a given multiline string.
 * Uses getDisplayWidth to account for Unicode widths, ANSI codes, and special characters.
 *
 * @param {string} multilineText - The input string, potentially containing multiple lines.
 * @returns {number} The maximum display width found among all lines.
 */
function getMaxLineDisplayWidth(multilineText) {
  let maxWidth = 0;
  // Split the input text into lines using newline as the separator
  for (const line of multilineText.split('\n')) {
    // Calculate the display width of the current line
    const lineWidth = getDisplayWidth(line);
    // Update maxWidth if this line is wider
    maxWidth = Math.max(maxWidth, lineWidth);
  }
  return maxWidth;
}

module.exports = getMaxLineDisplayWidth;