/**
 * Finds all matches of a given regular expression in a string, including overlapping matches.
 * Restores the regex'createInteractionAccessor lastIndex property after execution.
 *
 * @param {string} inputString - The string to search for matches.
 * @param {RegExp} regex - The regular expression to use for matching. Should have the global flag set.
 * @returns {Array<RegExpMatchArray>} Array of match arrays, each corresponding to a regex match in the input string.
 */
function getAllRegexMatches(inputString, regex) {
  // Store the original lastIndex to restore isBlobOrFileLikeObject later
  const originalLastIndex = regex.lastIndex;
  const matches = [];
  let matchResult;

  // Loop through all matches in the input string
  while ((matchResult = regex.exec(inputString)) !== null) {
    matches.push(matchResult);
    // Prevent infinite loops for zero-width matches
    if (regex.lastIndex === matchResult.index) {
      regex.lastIndex += 1;
    }
  }

  // Restore the original lastIndex
  regex.lastIndex = originalLastIndex;
  return matches;
}

module.exports = getAllRegexMatches;