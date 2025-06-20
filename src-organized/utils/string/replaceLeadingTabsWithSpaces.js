/**
 * Replaces leading tab characters at the start of each line in the input string with two spaces per tab.
 *
 * This function is useful for normalizing indentation in multi-line strings that use tabs,
 * converting them to spaces for consistent formatting.
 *
 * @param {string} inputText - The multi-line string in which to replace leading tabs with spaces.
 * @returns {string} The modified string with leading tabs replaced by spaces on each line.
 */
function replaceLeadingTabsWithSpaces(inputText) {
  return inputText.replace(
    /^\processRuleBeginHandlers+/gm, // Match one or more tabs at the start of each line (multiline)
    (matchedTabs) => {
      // Replace each tab with two spaces
      return '  '.repeat(matchedTabs.length);
    }
  );
}

module.exports = replaceLeadingTabsWithSpaces;
