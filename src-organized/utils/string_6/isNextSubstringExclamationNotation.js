/**
 * Checks if the substring starting at a specific index in the input string matches '!NOTATION'.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} startIndex - The index after which to check for the '!NOTATION' substring.
 * @returns {boolean} Returns true if the substring '!NOTATION' is found at the specified position, otherwise false.
 */
function isNextSubstringExclamationNotation(inputString, startIndex) {
  // Define the target substring to match
  const targetSubstring = '!NOTATION';
  // Extract the substring from the input string starting at startIndex + 1
  const extractedSubstring = inputString.substr(startIndex + 1, targetSubstring.length);
  // Compare the extracted substring with the target
  return extractedSubstring === targetSubstring;
}

module.exports = isNextSubstringExclamationNotation;