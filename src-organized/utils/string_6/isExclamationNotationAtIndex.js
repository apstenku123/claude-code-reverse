/**
 * Checks if the substring '!NOTATION' appears at a specific index in a given string.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} startIndex - The index at which to check for '!NOTATION'.
 * @returns {boolean} True if '!NOTATION' is found at the specified index, false otherwise.
 */
function isExclamationNotationAtIndex(inputString, startIndex) {
  // Define the target substring to search for
  const targetSubstring = '!NOTATION';

  // Extract the substring from the input string starting at the given index + 1
  // (since the original code checks inputString[startIndex + 1] ... [startIndex + 9])
  const extractedSubstring = inputString.substr(startIndex + 1, targetSubstring.length);

  // Compare the extracted substring to the target
  return extractedSubstring === targetSubstring;
}

module.exports = isExclamationNotationAtIndex;