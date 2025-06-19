/**
 * Replaces leading tab characters at the start of each line in a string with spaces.
 * Each tab is replaced by a configurable number of spaces (default is 2).
 *
 * @param {string} inputText - The multi-line string to process.
 * @param {number} [spacesPerTab=2] - The number of spaces to replace each leading tab with.
 * @returns {string} The processed string with leading tabs replaced by spaces.
 */
const convertLeadingTabsToSpaces = (inputText, spacesPerTab = 2) => {
  return inputText.replace(
    /^\processRuleBeginHandlers+/gm, // Match one or more tabs at the start of each line (multiline)
    (matchedTabs) => {
      // Replace each tab with the specified number of spaces
      return " ".repeat(matchedTabs.length * spacesPerTab);
    }
  );
};

module.exports = convertLeadingTabsToSpaces;
