/**
 * Splits the input string into three parts based on the first occurrence of the search substring.
 * If the search substring is found, returns an array with:
 *   [substring before match, matched substring, substring after match].
 * If not found, returns [original string, '', ''].
 *
 * @param {string} inputString - The string to search within.
 * @param {string} searchString - The substring to search for.
 * @returns {[string, string, string]} An array containing the parts before, matching, and after the search substring.
 */
function splitStringBySubstring(inputString, searchString) {
  // Find the index of the first occurrence of searchString in inputString
  const matchIndex = inputString.indexOf(searchString);

  if (matchIndex !== -1) {
    // If found, split into [before, match, after]
    const beforeMatch = inputString.substring(0, matchIndex);
    const afterMatch = inputString.substring(matchIndex + searchString.length);
    return [beforeMatch, searchString, afterMatch];
  }

  // If not found, return [original string, '', '']
  return [inputString, "", ""];
}

module.exports = splitStringBySubstring;
