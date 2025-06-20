/**
 * Extracts all matches of a predefined regular expression from the input string.
 *
 * @param {string} inputString - The string to search for matches.
 * @returns {Array} An array of all matches found, or an empty array if no matches are found.
 */
function getAllMatchesFromString(inputString) {
  // Use the global regular expression 'l66' to find all matches in the input string.
  // If no matches are found, return an empty array.
  return inputString.match(l66) || [];
}

module.exports = getAllMatchesFromString;