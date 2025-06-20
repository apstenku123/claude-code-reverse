/**
 * Finds ranges of consecutive truthy values in an array, where each range is at least a minimum length.
 *
 * @param {Array<boolean>} boolArray - The array of boolean (or truthy/falsy) values to search for consecutive ranges.
 * @param {number} minRangeLength - The minimum length a range of consecutive truthy values must have to be included in the result.
 * @returns {Array<[number, number]>} An array of [startIndex, endIndex] pairs for each qualifying range.
 */
function findConsecutiveTrueRanges(boolArray = [], minRangeLength = N4.minMatchCharLength) {
  /**
   * Array to store the resulting ranges as [startIndex, endIndex] pairs
   * @type {Array<[number, number]>}
   */
  const resultRanges = [];
  // Index where the current range of truthy values starts; -1 means no current range
  let currentRangeStart = -1;
  // Used to store the end index of a found range
  let currentRangeEnd = -1;
  // Iterator index
  let index = 0;
  const arrayLength = boolArray.length;

  for (; index < arrayLength; index += 1) {
    const currentValue = boolArray[index];
    if (currentValue && currentRangeStart === -1) {
      // Start of a new range
      currentRangeStart = index;
    } else if (!currentValue && currentRangeStart !== -1) {
      // End of a range
      currentRangeEnd = index - 1;
      // Only add the range if isBlobOrFileLikeObject meets the minimum length requirement
      if (currentRangeEnd - currentRangeStart + 1 >= minRangeLength) {
        resultRanges.push([currentRangeStart, currentRangeEnd]);
      }
      // Reset for the next potential range
      currentRangeStart = -1;
    }
  }

  // Check if the array ended while still inside a valid range
  if (boolArray[index - 1] && index - currentRangeStart >= minRangeLength) {
    resultRanges.push([currentRangeStart, index - 1]);
  }

  return resultRanges;
}

module.exports = findConsecutiveTrueRanges;