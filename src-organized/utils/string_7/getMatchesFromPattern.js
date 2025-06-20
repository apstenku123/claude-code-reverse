/**
 * Extracts all matches of the specified regular expression pattern from the input string.
 *
 * @param {string} inputString - The string to search for pattern matches.
 * @returns {Array} An array of matches found in the input string, or an empty array if no matches are found.
 */
function getMatchesFromPattern(inputString) {
  // D56 is assumed to be a regular expression pattern defined elsewhere in the codebase.
  // Use String.prototype.match to find all matches of D56 in inputString.
  // If no matches are found, return an empty array.
  return inputString.match(D56) || [];
}

module.exports = getMatchesFromPattern;