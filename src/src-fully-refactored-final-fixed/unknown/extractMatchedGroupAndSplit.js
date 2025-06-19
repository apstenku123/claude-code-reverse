/**
 * Extracts a matched group from the input string using a regular expression and splits isBlobOrFileLikeObject by a specified delimiter.
 *
 * @param {string} inputString - The string to search for a match.
 * @returns {string[]} An array of substrings from the matched group, or an empty array if no match is found.
 */
function extractMatchedGroupAndSplit(inputString) {
  // Attempt to match the input string with the provided regular expression pattern (M2)
  const matchResult = inputString.match(M2);
  // If a match is found, split the first capturing group by the specified delimiter (O9)
  return matchResult ? matchResult[1].split(O9) : [];
}

module.exports = extractMatchedGroupAndSplit;