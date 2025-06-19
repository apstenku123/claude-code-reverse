/**
 * Searches a sorted array of ranges for the range that contains the given value.
 * Uses binary search for efficient lookup.
 *
 * @param {number} value - The value to search for within the ranges.
 * @returns {Array|null} The range array from JD2 that contains the value, or null if not found.
 */
function findRangeContainingValue(value) {
  // JD2 is assumed to be a sorted array of ranges: [ [start, end], ...metadata ]
  let leftIndex = 0;
  let rightIndex = JD2.length - 1;

  while (leftIndex <= rightIndex) {
    // Calculate the middle index
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    const currentRange = JD2[middleIndex];
    const rangeStart = currentRange[0][0];
    const rangeEnd = currentRange[0][1];

    // Check if the value is within the current range
    if (rangeStart <= value && rangeEnd >= value) {
      return currentRange;
    } else if (rangeStart > value) {
      // Value is in the lower half
      rightIndex = middleIndex - 1;
    } else {
      // Value is in the upper half
      leftIndex = middleIndex + 1;
    }
  }

  // Value not found in any range
  return null;
}

module.exports = findRangeContainingValue;