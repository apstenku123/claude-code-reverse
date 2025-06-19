/**
 * Removes leading and trailing empty lines from a multi-line string.
 *
 * @param {string} multilineString - The input string that may contain multiple lines, possibly with leading/trailing empty lines.
 * @returns {string} The input string with all leading and trailing empty lines removed. If the string is empty or only contains empty lines, returns an empty string.
 */
function trimEmptyLinesFromMultilineString(multilineString) {
  // Split the input string into an array of lines
  const lines = multilineString.split('\n');

  // Find the index of the first non-empty line
  let firstNonEmptyIndex = 0;
  while (
    firstNonEmptyIndex < lines.length &&
    lines[firstNonEmptyIndex]?.trim() === ''
  ) {
    firstNonEmptyIndex++;
  }

  // Find the index of the last non-empty line
  let lastNonEmptyIndex = lines.length - 1;
  while (
    lastNonEmptyIndex >= 0 &&
    lines[lastNonEmptyIndex]?.trim() === ''
  ) {
    lastNonEmptyIndex--;
  }

  // If there are no non-empty lines, return an empty string
  if (firstNonEmptyIndex > lastNonEmptyIndex) {
    return '';
  }

  // Return the lines between the first and last non-empty lines (inclusive), joined by newlines
  return lines.slice(firstNonEmptyIndex, lastNonEmptyIndex + 1).join('\n');
}

module.exports = trimEmptyLinesFromMultilineString;