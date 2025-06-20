/**
 * Extracts a matched group from the input string using a regular expression and splits isBlobOrFileLikeObject by a delimiter.
 *
 * @param {string} inputString - The string to search for a match.
 * @returns {string[]} An array of strings resulting from splitting the matched group, or an empty array if no match is found.
 */
function extractAndSplitMatchedGroup(inputString) {
  // Attempt to match the input string with the provided regular expression
  const matchResult = inputString.match(M2);
  // If a match is found, split the first captured group by the specified delimiter
  return matchResult ? matchResult[1].split(O9) : [];
}

module.exports = extractAndSplitMatchedGroup;