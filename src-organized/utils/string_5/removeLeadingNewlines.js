/**
 * Removes all leading newline characters (\n) from the beginning of the input string.
 *
 * @param {string} inputString - The string from which to remove leading newlines.
 * @returns {string} The input string with all leading newlines removed.
 */
function removeLeadingNewlines(inputString) {
  // Use a regular expression to replace all newlines at the start of the string with an empty string
  return inputString.replace(/^\n*/, "");
}

module.exports = removeLeadingNewlines;
