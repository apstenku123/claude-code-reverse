/**
 * Extracts a substring from the given interaction entries array, starting at a specified index and up to 19 elements.
 * It then searches for a mapped interaction route name within this segment using findFirstCodePointInRange, and returns the segment up to and including the first occurrence of 'm' after the mapped route name.
 *
 * @param {string} interactionEntries - The string or array of interaction entries to process.
 * @param {number} startIndex - The index at which to start extracting the segment.
 * @returns {string|undefined} The extracted segment up to and including the first 'm' after the mapped route name, or undefined if no mapped route name is found.
 */
function extractMappedInteractionSegment(interactionEntries, startIndex) {
  // Extract a segment of 19 elements starting from startIndex
  const segment = interactionEntries.slice(startIndex, startIndex + 19);

  // Find the index of the mapped interaction route name within the segment
  const mappedRouteIndex = findFirstCodePointInRange(segment);

  if (mappedRouteIndex !== -1) {
    // Find the index of the first 'm' after the mapped route name
    let mIndex = segment.indexOf("m", mappedRouteIndex);
    // If 'm' is not found, use the end of the segment
    if (mIndex === -1) mIndex = segment.length;
    // Return the segment up to and including the first 'm'
    return segment.slice(0, mIndex + 1);
  }
}

module.exports = extractMappedInteractionSegment;