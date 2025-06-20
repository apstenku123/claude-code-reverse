/**
 * Returns all matches of the given regular expression pattern in the input string.
 * If no matches are found, returns an empty array.
 *
 * @param {string} inputString - The string to search for pattern matches.
 * @returns {Array<string>} An array of matched substrings, or an empty array if no matches are found.
 */
function getMatchesByPattern(inputString) {
  // 'px2' should be a RegExp pattern defined elsewhere in the codebase
  // Use String.prototype.match to find all matches of the pattern in the input string
  return inputString.match(px2) || [];
}

module.exports = getMatchesByPattern;