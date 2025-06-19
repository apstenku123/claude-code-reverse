/**
 * Searches for a range in the JD2 array that contains the specified value.
 * Uses binary search for efficient lookup. Each element in JD2 is expected to be an array
 * where the first element is a two-element array representing the [start, end] of a range.
 *
 * @param {number} value - The value to search for within the ranges.
 * @returns {Array|null} The matching range entry from JD2 if found, otherwise null.
 */
function findRangeForValue(value) {
  let leftIndex = 0;
  let rightIndex = JD2.length - 1;

  // Perform binary search to find the range containing the value
  while (leftIndex <= rightIndex) {
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    const rangeEntry = JD2[middleIndex];
    const [rangeStart, rangeEnd] = rangeEntry[0];

    if (rangeStart <= value && rangeEnd >= value) {
      // Value is within the current range
      return rangeEntry;
    } else if (rangeStart > value) {
      // Value is less than the start of the current range; search left half
      rightIndex = middleIndex - 1;
    } else {
      // Value is greater than the end of the current range; search right half
      leftIndex = middleIndex + 1;
    }
  }

  // No matching range found
  return null;
}

module.exports = findRangeForValue;