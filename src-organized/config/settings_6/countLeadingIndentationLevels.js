/**
 * Calculates the number of leading indentation levels (tabs or spaces) at the start of a given string.
 * Indentation is determined by the provided tab size (default is 4 spaces per tab).
 *
 * @param {string} line - The string to analyze for leading indentation.
 * @param {Object} options - Configuration options.
 * @param {number} [options.tabSize=4] - The number of spaces that represent a tab.
 * @returns {number} The number of leading indentation levels.
 */
function countLeadingIndentationLevels(line, options) {
  const TAB_CHARACTER = '\processRuleBeginHandlers';
  // DF is assumed to be a global or imported dependency
  // DF[1] is likely the space character
  const SPACE_CHARACTER = typeof DF !== 'undefined' ? DF[1] : ' ';
  const tabSize = (options && options.tabSize) || 4;

  let currentIndex = 0;
  let indentationCount = 0;

  // Iterate through each character at the start of the line
  while (currentIndex < line.length) {
    const currentChar = line.charAt(currentIndex);
    if (currentChar === SPACE_CHARACTER) {
      // Increment for each space
      indentationCount++;
    } else if (currentChar === TAB_CHARACTER) {
      // Increment by tabSize for each tab
      indentationCount += tabSize;
    } else {
      // Stop counting when a non-indentation character is found
      break;
    }
    currentIndex++;
  }

  // Calculate the number of indentation levels (integer division)
  return Math.floor(indentationCount / tabSize);
}

module.exports = countLeadingIndentationLevels;