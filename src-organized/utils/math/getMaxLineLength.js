/**
 * Returns the maximum length (as determined by YO2) among all lines in the input string,
 * after removing a specific pattern (provided by getAnsiEscapeSequenceRegex) from the string.
 *
 * @param {string} inputText - The input string to process.
 * @returns {number} The maximum value returned by YO2 for any line in the processed string.
 */
function getMaxLineLength(inputText) {
  // Get the regular expression or pattern to remove from the input
  const patternToRemove = getAnsiEscapeSequenceRegex();

  // Remove the pattern, split into lines, and find the maximum YO2 value among all lines
  return String(inputText)
    .replace(patternToRemove, "")
    .split(`\n`)
    .reduce((maxValue, line) => {
      // Compute YO2 for the current line and compare with the current max
      const lineValue = YO2(line);
      return lineValue > maxValue ? lineValue : maxValue;
    }, 0);
}

module.exports = getMaxLineLength;