/**
 * Returns all matches of the px2 regular expression found in the input string.
 *
 * @param {string} inputString - The string to search for px2 pattern matches.
 * @returns {Array<string>} An array of matched substrings, or an empty array if no matches are found.
 */
function getPx2Matches(inputString) {
  // Attempt to match the px2 pattern in the input string; return empty array if no matches
  return inputString.match(px2) || [];
}

module.exports = getPx2Matches;