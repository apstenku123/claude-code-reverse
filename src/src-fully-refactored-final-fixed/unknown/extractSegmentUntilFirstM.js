/**
 * Extracts a 19-character segment from the input string starting at the given index, 
 * searches for a specific pattern using findFirstDigitIndex, and returns the substring up to and including the first 'm' after the pattern.
 *
 * @param {string} inputString - The string to extract the segment from.
 * @param {number} startIndex - The index at which to start extracting the 19-character segment.
 * @returns {string|undefined} The substring from the start of the segment up to and including the first 'm' after the pattern, or undefined if the pattern is not found.
 */
function extractSegmentUntilFirstM(inputString, startIndex) {
  // Extract a 19-character segment starting from startIndex
  const segment = inputString.slice(startIndex, startIndex + 19);

  // Find the index of the pattern in the segment using findFirstDigitIndex
  const patternIndex = findFirstDigitIndex(segment);

  // If the pattern is found
  if (patternIndex !== -1) {
    // Find the index of the first 'm' after the pattern
    let mIndex = segment.indexOf('m', patternIndex);
    // If 'm' is not found, use the end of the segment
    if (mIndex === -1) mIndex = segment.length;
    // Return the substring up to and including the first 'm'
    return segment.slice(0, mIndex + 1);
  }
}

module.exports = extractSegmentUntilFirstM;