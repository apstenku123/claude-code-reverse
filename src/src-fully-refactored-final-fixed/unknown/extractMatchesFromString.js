/**
 * Extracts all matches of a specified regular expression from the input string.
 *
 * @param {string} inputString - The string to search for matches.
 * @param {RegExp} pattern - The regular expression pattern to match against the input string.
 * @returns {Array} An array of matches found in the input string, or an empty array if no matches are found.
 */
function extractMatchesFromString(inputString, pattern) {
  // Use String.prototype.match to find all matches of the pattern in the input string.
  // If no matches are found, return an empty array.
  return inputString.match(pattern) || [];
}

module.exports = extractMatchesFromString;