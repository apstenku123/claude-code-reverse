/**
 * Extracts a 19-character substring from the input string starting at the given index, 
 * then searches for a specific pattern using findFirstCodePointInRange. If found, returns the substring up to and including the first 'm' character after the pattern.
 *
 * @param {string} inputString - The source string to extract from.
 * @param {number} startIndex - The starting index for extraction.
 * @returns {string|undefined} The extracted substring up to and including the first 'm' after the pattern, or undefined if the pattern is not found.
 */
function extractSubstringUntilFirstM(inputString, startIndex) {
  // Extract a substring of length 19 starting from startIndex
  const substring = inputString.slice(startIndex, startIndex + 19);
  // Find the index of the pattern using findFirstCodePointInRange
  const patternIndex = findFirstCodePointInRange(substring);
  if (patternIndex !== -1) {
    // Find the index of the first 'm' after the pattern
    let mIndex = substring.indexOf('m', patternIndex);
    // If 'm' is not found, use the end of the substring
    if (mIndex === -1) {
      mIndex = substring.length;
    }
    // Return the substring up to and including the first 'm'
    return substring.slice(0, mIndex + 1);
  }
}

module.exports = extractSubstringUntilFirstM;