/**
 * Performs a binary search for a target value within a specific range of the global 'jj' array.
 * The search range is determined by an offset index and a length value stored in 'jj'.
 * If the target value is found, returns the associated value at the same offset in the next segment.
 * Otherwise, returns -1.
 *
 * @param {number} offsetIndex - The index in the 'jj' array where the segment starts (will be incremented internally).
 * @param {number} targetValue - The value to search for within the segment.
 * @returns {any} The value associated with the found target, or -1 if not found.
 */
function binarySearchWithOffset(offsetIndex, targetValue) {
  // The segment length is stored at jj[offsetIndex + 1]
  const segmentLength = jj[++offsetIndex];
  // Start searching from the next index
  let searchStart = ++offsetIndex;
  // The end index of the segment
  let searchEnd = searchStart + segmentLength - 1;

  // Standard binary search within the segment
  while (searchStart <= searchEnd) {
    // Calculate the midpoint
    const midIndex = (searchStart + searchEnd) >>> 1;
    const midValue = jj[midIndex];

    if (midValue < targetValue) {
      searchStart = midIndex + 1;
    } else if (midValue > targetValue) {
      searchEnd = midIndex - 1;
    } else {
      // If found, return the associated value at the same offset in the next segment
      return jj[midIndex + segmentLength];
    }
  }

  // Target value not found
  return -1;
}

module.exports = binarySearchWithOffset;