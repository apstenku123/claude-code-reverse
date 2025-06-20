/**
 * Extracts a substring of length 19 from the input string starting at the given index,
 * then searches for a specific pattern using findFirstCodePointInRange. If found, returns the substring
 * from the start up to and including the first occurrence of 'm' after the pattern.
 *
 * @param {string} inputString - The string to extract the substring from.
 * @param {number} startIndex - The index at which to start the substring extraction.
 * @returns {string|undefined} The extracted substring up to and including the first 'm' after the pattern, or undefined if the pattern is not found.
 */
function extractSubstringUntilM(inputString, startIndex) {
  // Extract a substring of length 19 starting from startIndex
  const substring = inputString.slice(startIndex, startIndex + 19);

  // Find the index of the pattern using findFirstCodePointInRange
  const patternIndex = findFirstCodePointInRange(substring);

  // If the pattern is found
  if (patternIndex !== -1) {
    // Find the index of the first 'm' after the pattern
    let mIndex = substring.indexOf('m', patternIndex);

    // If 'm' is not found, use the end of the substring
    if (mIndex === -1) {
      mIndex = substring.length;
    }

    // Return the substring from the start up to and including the first 'm'
    return substring.slice(0, mIndex + 1);
  }
}

module.exports = extractSubstringUntilM;