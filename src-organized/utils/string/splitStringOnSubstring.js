/**
 * Splits the input string into three parts based on the first occurrence of the search substring.
 * If the search substring is found, returns an array containing:
 *   - The part before the search substring
 *   - The search substring itself
 *   - The part after the search substring
 * If the search substring is not found, returns an array containing:
 *   - The original string
 *   - An empty string
 *   - An empty string
 *
 * @param {string} inputString - The string to search within.
 * @param {string} searchSubstring - The substring to search for.
 * @returns {[string, string, string]} An array with three elements: [before, match, after]
 */
function splitStringOnSubstring(inputString, searchSubstring) {
  // Find the index of the first occurrence of the search substring
  const matchIndex = inputString.indexOf(searchSubstring);

  // If the substring is found, split the string into three parts
  if (matchIndex !== -1) {
    const beforeMatch = inputString.substring(0, matchIndex);
    const match = searchSubstring;
    const afterMatch = inputString.substring(matchIndex + searchSubstring.length);
    return [beforeMatch, match, afterMatch];
  }

  // If the substring is not found, return the original string and two empty strings
  return [inputString, "", ""];
}

module.exports = splitStringOnSubstring;
