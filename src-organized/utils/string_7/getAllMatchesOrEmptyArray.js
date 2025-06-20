/**
 * Returns all matches of the provided regular expression in the input string, or an empty array if no matches are found.
 *
 * @param {string} inputString - The string to search for matches.
 * @param {RegExp} pattern - The regular expression pattern to match against the input string.
 * @returns {Array} An array of matches, or an empty array if no matches are found.
 */
function getAllMatchesOrEmptyArray(inputString, pattern) {
  // Use String.prototype.match to find all matches of the pattern in the input string.
  // If no matches are found, return an empty array instead of null.
  return inputString.match(pattern) || [];
}

module.exports = getAllMatchesOrEmptyArray;