/**
 * Replaces all double-quote characters in the input string with the HTML entity &quot;.
 *
 * @param {string} inputString - The string in which to replace double quotes.
 * @returns {string} The input string with all double quotes replaced by &quot;.
 */
const DOUBLE_QUOTE_REGEX = /"/g; // Matches all double-quote characters

function escapeDoubleQuotes(inputString) {
  // Replace all double quotes with the HTML entity &quot;
  return inputString.replace(DOUBLE_QUOTE_REGEX, "&quot;");
}

module.exports = escapeDoubleQuotes;