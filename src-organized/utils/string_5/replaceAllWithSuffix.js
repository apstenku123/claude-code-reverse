/**
 * Replaces all occurrences of a target substring within a source string with the target substring followed by a given suffix.
 *
 * @param {string} sourceString - The string to search and replace within.
 * @param {string} targetSubstring - The substring to search for and replace.
 * @param {string} suffix - The string to append after each occurrence of the target substring.
 * @returns {string} The resulting string after all replacements.
 */
function replaceAllWithSuffix(sourceString, targetSubstring, suffix) {
  // Find the first occurrence of the target substring
  let currentIndex = sourceString.indexOf(targetSubstring);
  // If the target substring is not found, return the original string
  if (currentIndex === -1) return sourceString;

  const targetLength = targetSubstring.length;
  let searchStartIndex = 0;
  let resultString = "";

  // Loop through all occurrences of the target substring
  do {
    // Append the segment before the found substring, then the substring and the suffix
    resultString += sourceString.substring(searchStartIndex, currentIndex) + targetSubstring + suffix;
    // Move the search start index past the found substring
    searchStartIndex = currentIndex + targetLength;
    // Find the next occurrence
    currentIndex = sourceString.indexOf(targetSubstring, searchStartIndex);
  } while (currentIndex !== -1);

  // Append the remaining part of the string after the last occurrence
  resultString += sourceString.substring(searchStartIndex);
  return resultString;
}

module.exports = replaceAllWithSuffix;
