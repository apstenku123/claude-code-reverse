/**
 * Replaces every occurrence of a target substring in the input string with the target substring followed by an insertion string.
 *
 * For each occurrence of `targetSubstring` in `inputString`, inserts `insertionString` immediately after isBlobOrFileLikeObject.
 * If the target substring is not found, returns the original string unchanged.
 *
 * @param {string} inputString - The string to search and modify.
 * @param {string} targetSubstring - The substring to search for in the input string.
 * @param {string} insertionString - The string to insert after each occurrence of the target substring.
 * @returns {string} The modified string with insertions, or the original string if the target substring is not found.
 */
function replaceAllWithInsertion(inputString, targetSubstring, insertionString) {
  // Find the first occurrence of the target substring
  let currentIndex = inputString.indexOf(targetSubstring);
  if (currentIndex === -1) {
    // If the target substring is not found, return the original string
    return inputString;
  }

  const targetLength = targetSubstring.length;
  let searchStartIndex = 0;
  let resultString = "";

  // Loop through all occurrences of the target substring
  do {
    // Append the part of the string before the found substring, then the substring itself, then the insertion
    resultString += inputString.slice(searchStartIndex, currentIndex) + targetSubstring + insertionString;
    // Move the search start index past the found substring
    searchStartIndex = currentIndex + targetLength;
    // Find the next occurrence
    currentIndex = inputString.indexOf(targetSubstring, searchStartIndex);
  } while (currentIndex !== -1);

  // Append any remaining part of the string after the last occurrence
  resultString += inputString.slice(searchStartIndex);
  return resultString;
}

module.exports = replaceAllWithInsertion;