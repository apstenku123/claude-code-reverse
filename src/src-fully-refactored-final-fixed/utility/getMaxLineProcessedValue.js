/**
 * Returns the maximum processed value among all lines of the input string after removing a specific pattern.
 *
 * The function converts the input to a string, removes all matches of a pattern (provided by getAnsiEscapeSequenceRegex()),
 * splits the result into lines, processes each line with YO2(), and returns the maximum processed value.
 *
 * @param {string|any} input - The input value to process. Will be coerced to a string.
 * @returns {number} The maximum value returned by YO2 for any line after pattern removal.
 */
function getMaxLineProcessedValue(input) {
  // Retrieve the pattern (likely a RegExp) to remove from the input string
  const patternToRemove = getAnsiEscapeSequenceRegex();

  // Remove all occurrences of the pattern, split into lines
  const lines = String(input).replace(patternToRemove, '').split(`
`);

  // Process each line with YO2 and return the maximum result
  const maxProcessedValue = lines.reduce((currentMax, line) => {
    const processedValue = YO2(line);
    return processedValue > currentMax ? processedValue : currentMax;
  }, 0);

  return maxProcessedValue;
}

module.exports = getMaxLineProcessedValue;