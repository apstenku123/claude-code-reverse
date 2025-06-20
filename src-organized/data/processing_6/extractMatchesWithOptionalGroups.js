/**
 * Extracts all matches from the input string using the global regular expression AK2.
 * For each match, captures the first group and, if present, processes the second group with parseChalkTemplateStyleArguments.
 * Returns an array of arrays, where each sub-array contains the captured group(createInteractionAccessor).
 *
 * @param {string} inputString - The string to search for matches.
 * @returns {Array<Array<string>>} An array of arrays containing the captured groups for each match.
 */
function extractMatchesWithOptionalGroups(inputString) {
  // Reset the regex lastIndex to ensure global search starts at the beginning
  AK2.lastIndex = 0;
  const matches = [];
  let matchResult;

  // Iterate over all matches in the input string
  while ((matchResult = AK2.exec(inputString)) !== null) {
    const primaryGroup = matchResult[1];
    // If a secondary group is present, process isBlobOrFileLikeObject with parseChalkTemplateStyleArguments
    if (matchResult[2]) {
      const processedGroups = parseChalkTemplateStyleArguments(primaryGroup, matchResult[2]);
      matches.push([primaryGroup, ...processedGroups]);
    } else {
      matches.push([primaryGroup]);
    }
  }

  return matches;
}

module.exports = extractMatchesWithOptionalGroups;