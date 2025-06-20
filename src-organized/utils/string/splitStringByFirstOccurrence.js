/**
 * Splits the input string into three parts based on the first occurrence of the search string.
 * If the search string is found, returns an array containing:
 *   [substring before match, matched string, substring after match].
 * If the search string is not found, returns [input string, '', ''].
 *
 * @param {string} inputString - The string to search within.
 * @param {string} searchString - The string to search for.
 * @returns {Array<string>} An array with three elements: [before, match, after].
 */
function splitStringByFirstOccurrence(inputString, searchString) {
  // Find the index of the first occurrence of searchString in inputString
  const matchIndex = inputString.indexOf(searchString);

  if (matchIndex !== -1) {
    // searchString found: split into [before, match, after]
    return [
      inputString.substring(0, matchIndex),
      searchString,
      inputString.substring(matchIndex + searchString.length)
    ];
  }

  // searchString not found: return [inputString, '', '']
  return [inputString, '', ''];
}

module.exports = splitStringByFirstOccurrence;
