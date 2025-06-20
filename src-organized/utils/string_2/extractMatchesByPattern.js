/**
 * Extracts all matches of the global regular expression 'px2' from the provided input string.
 *
 * @param {string} inputString - The string to search for matches.
 * @returns {string[]} An array of all matches found, or an empty array if no matches are found.
 */
function extractMatchesByPattern(inputString) {
  // Attempt to match the input string against the px2 regular expression
  // If no matches are found, return an empty array
  return inputString.match(px2) || [];
}

module.exports = extractMatchesByPattern;