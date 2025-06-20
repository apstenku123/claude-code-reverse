/**
 * Inserts a specified string after every occurrence of a target substring within the source string.
 *
 * @param {string} sourceString - The original string to process.
 * @param {string} targetSubstring - The substring to search for within the source string.
 * @param {string} stringToInsert - The string to insert after each occurrence of the target substring.
 * @returns {string} The resulting string with the inserted strings after each occurrence of the target substring.
 */
function insertStringAfterEachOccurrence(sourceString, targetSubstring, stringToInsert) {
  let currentIndex = sourceString.indexOf(targetSubstring);
  if (currentIndex === -1) return sourceString; // No occurrences found, return original string

  const targetLength = targetSubstring.length;
  let searchStartIndex = 0;
  let resultString = "";

  // Loop through all occurrences of the target substring
  do {
    // Append the segment before the found substring, then the substring and the string to insert
    resultString += sourceString.slice(searchStartIndex, currentIndex) + targetSubstring + stringToInsert;
    // Move the search start index past the found substring
    searchStartIndex = currentIndex + targetLength;
    // Find the next occurrence
    currentIndex = sourceString.indexOf(targetSubstring, searchStartIndex);
  } while (currentIndex !== -1);

  // Append any remaining part of the source string after the last occurrence
  resultString += sourceString.slice(searchStartIndex);
  return resultString;
}

module.exports = insertStringAfterEachOccurrence;