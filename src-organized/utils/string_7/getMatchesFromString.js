/**
 * Extracts all matches of the D56 regular expression from the provided input string.
 *
 * @param {string} inputString - The string to search for matches.
 * @returns {Array} An array containing all matches found, or an empty array if no matches are found.
 */
function getMatchesFromString(inputString) {
  // Use the D56 regular expression to find matches in the input string
  // If no matches are found, return an empty array
  return inputString.match(D56) || [];
}

module.exports = getMatchesFromString;