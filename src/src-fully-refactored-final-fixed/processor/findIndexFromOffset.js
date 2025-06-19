/**
 * Searches for the first occurrence of a target value in an array, starting from a specified offset.
 *
 * @param {Array} array - The array to search through.
 * @param {*} targetValue - The value to search for within the array.
 * @param {number} startOffset - The index to start searching from (exclusive).
 * @returns {number} The index of the first occurrence of the target value after the offset, or -1 if not found.
 */
function findIndexFromOffset(array, targetValue, startOffset) {
  const arrayLength = array.length;
  let currentIndex = startOffset;
  // Start searching from the next index after startOffset
  while (++currentIndex < arrayLength) {
    if (array[currentIndex] === targetValue) {
      return currentIndex;
    }
  }
  // Return -1 if the target value is not found
  return -1;
}

module.exports = findIndexFromOffset;