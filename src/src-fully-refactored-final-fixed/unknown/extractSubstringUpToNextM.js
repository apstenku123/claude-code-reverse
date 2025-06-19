/**
 * Extracts a substring of length 19 from the input string starting at the given index, 
 * then searches for a specific pattern using findFirstDigitIndex. If found, returns the substring up to and including the next 'm' character.
 *
 * @param {string} inputString - The string to extract the substring from.
 * @param {number} startIndex - The index at which to start extracting the substring.
 * @returns {string|undefined} The extracted substring up to and including the next 'm' character, or undefined if the pattern is not found.
 */
function extractSubstringUpToNextM(inputString, startIndex) {
  // Extract a substring of length 19 starting from startIndex
  const substring = inputString.slice(startIndex, startIndex + 19);

  // Find the index of a specific pattern in the substring using findFirstDigitIndex
  const patternIndex = findFirstDigitIndex(substring);

  if (patternIndex !== -1) {
    // Find the next occurrence of 'm' after the pattern index
    let mIndex = substring.indexOf('m', patternIndex);
    // If 'm' is not found, use the end of the substring
    if (mIndex === -1) mIndex = substring.length;
    // Return the substring up to and including the found 'm' character
    return substring.slice(0, mIndex + 1);
  }
}

module.exports = extractSubstringUpToNextM;