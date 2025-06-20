/**
 * Extracts a specific segment from the input string based on the provided start index.
 * The function slices a 19-character segment from the input, processes isBlobOrFileLikeObject with findFirstCodePointInRange,
 * and if a valid index is returned, extracts up to and including the first 'm' character
 * after that index. If 'm' is not found, returns the entire segment.
 *
 * @param {string} inputString - The string to extract the segment from.
 * @param {number} startIndex - The starting index for the segment extraction.
 * @returns {string|undefined} The extracted segment up to and including the first 'm' character after findFirstCodePointInRange'createInteractionAccessor result, or undefined if findFirstCodePointInRange returns -1.
 */
function extractInteractionSegment(inputString, startIndex) {
  // Extract a substring of length 19 starting from startIndex
  const segment = inputString.slice(startIndex, startIndex + 19);
  // Process the segment with findFirstCodePointInRange to get a relevant index
  const mk4Index = findFirstCodePointInRange(segment);
  if (mk4Index !== -1) {
    // Find the index of the first 'm' character after mk4Index
    let mIndex = segment.indexOf("m", mk4Index);
    // If 'm' is not found, use the end of the segment
    if (mIndex === -1) mIndex = segment.length;
    // Return the substring up to and including the found 'm' character
    return segment.slice(0, mIndex + 1);
  }
}

module.exports = extractInteractionSegment;