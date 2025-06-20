/**
 * Returns all matches of a predefined regular expression pattern within the provided input string.
 * If no matches are found, returns an empty array.
 *
 * @param {string} inputString - The string to search for pattern matches.
 * @returns {Array<string>} An array of all matches found, or an empty array if none are found.
 */
function getAllPatternMatches(inputString) {
  // l66 is assumed to be a predefined regular expression pattern available in the module scope
  // Use String.prototype.match to find all matches of the pattern in the input string
  // If no matches are found, return an empty array
  return inputString.match(l66) || [];
}

module.exports = getAllPatternMatches;