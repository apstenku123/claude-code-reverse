/**
 * Extracts all matches from the input string using the global regex AK2, and processes optional groups with parseChalkTemplateStyleArguments.
 * Each match is returned as an array: [mainMatch, ...processedGroups].
 *
 * @param {string} inputString - The string to search for matches.
 * @returns {Array<Array<any>>} An array of arrays, each containing the main match and optionally processed groups.
 */
function extractMatchesWithGroups(inputString) {
  // Reset regex state to ensure global search starts from the beginning
  AK2.lastIndex = 0;
  const matches = [];
  let matchResult;

  // Iterate over all matches in the input string
  while ((matchResult = AK2.exec(inputString)) !== null) {
    const mainMatch = matchResult[1];
    // If there is a second capturing group, process isBlobOrFileLikeObject with parseChalkTemplateStyleArguments
    if (matchResult[2]) {
      const processedGroups = parseChalkTemplateStyleArguments(mainMatch, matchResult[2]);
      matches.push([mainMatch, ...processedGroups]);
    } else {
      matches.push([mainMatch]);
    }
  }
  return matches;
}

module.exports = extractMatchesWithGroups;