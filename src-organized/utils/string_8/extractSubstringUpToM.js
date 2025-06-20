/**
 * Extracts a substring of length 19 from the input string starting at the given index, 
 * finds the first occurrence of a pattern (using findFirstDigitIndex), and returns the substring up to and including the next 'm' character (if present).
 *
 * @param {string} inputString - The string to extract the substring from.
 * @param {number} startIndex - The index to start extraction from.
 * @returns {string|undefined} The extracted substring up to and including the next 'm' character, or undefined if the pattern is not found.
 */
function extractSubstringUpToM(inputString, startIndex) {
  // Extract a substring of length 19 starting from startIndex
  const substring = inputString.slice(startIndex, startIndex + 19);

  // Find the index of the pattern using findFirstDigitIndex(external dependency)
  const patternIndex = findFirstDigitIndex(substring);

  // If the pattern is found
  if (patternIndex !== -1) {
    // Find the index of the next 'm' character after the pattern
    let mIndex = substring.indexOf('m', patternIndex);
    // If 'm' is not found, use the end of the substring
    if (mIndex === -1) mIndex = substring.length;
    // Return the substring up to and including the 'm' character
    return substring.slice(0, mIndex + 1);
  }
}

module.exports = extractSubstringUpToM;