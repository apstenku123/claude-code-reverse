/**
 * Returns the maximum processed line length from a given input string after removing a specific pattern.
 *
 * This function first converts the input to a string, removes all occurrences of a pattern (provided by getAnsiEscapeSequenceRegex()),
 * splits the result into lines, processes each line with YO2, and returns the largest processed value.
 *
 * @param {string} inputString - The input string to process.
 * @returns {number} The maximum processed line length after applying YO2 to each line.
 */
function getMaxProcessedLineLength(inputString) {
  // Retrieve the pattern to remove from the input string
  const patternToRemove = getAnsiEscapeSequenceRegex();

  // Remove the pattern, split into lines, and process each line
  return String(inputString)
    .replace(patternToRemove, "")
    .split(`\n`)
    .reduce((maxValue, line) => {
      // Apply YO2 to the current line and compare with the current max
      const processedValue = YO2(line);
      return processedValue > maxValue ? processedValue : maxValue;
    }, 0);
}

module.exports = getMaxProcessedLineLength;