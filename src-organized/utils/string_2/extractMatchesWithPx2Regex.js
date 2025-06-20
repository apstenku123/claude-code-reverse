/**
 * Extracts all matches from the input string using the global 'px2' regular expression.
 *
 * @param {string} inputString - The string to search for matches.
 * @returns {Array<string>} An array of all matches found, or an empty array if none are found.
 */
function extractMatchesWithPx2Regex(inputString) {
  // Use the global 'px2' regex to find all matches in the input string
  // If no matches are found, return an empty array
  return inputString.match(px2) || [];
}

module.exports = extractMatchesWithPx2Regex;