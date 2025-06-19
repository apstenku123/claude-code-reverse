/**
 * Replaces leading tab characters at the start of each line in a string with spaces.
 * The number of spaces per tab can be configured.
 *
 * @param {string} inputText - The input string in which to replace leading tabs with spaces.
 * @param {number} [spacesPerTab=2] - The number of spaces to replace each tab with.
 * @returns {string} The resulting string with leading tabs replaced by spaces.
 */
const convertTabsToSpaces = (inputText, spacesPerTab = 2) => {
  // Use a regular expression to match leading tabs at the start of each line (multiline mode)
  return inputText.replace(/^	+/gm, (matchedTabs) => {
    // Replace each tab with the specified number of spaces
    return ' '.repeat(matchedTabs.length * spacesPerTab);
  });
};

module.exports = convertTabsToSpaces;
