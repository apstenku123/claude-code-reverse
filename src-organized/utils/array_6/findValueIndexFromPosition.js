/**
 * Searches for the first occurrence of a target value in an array, starting from a specified index.
 *
 * @param {Array} array - The array to search through.
 * @param {*} targetValue - The value to search for within the array.
 * @param {number} startIndex - The index to start searching from (exclusive).
 * @returns {number} The index of the first occurrence of the target value after startIndex, or -1 if not found.
 */
function findValueIndexFromPosition(array, targetValue, startIndex) {
  // Initialize the search index to one position after the provided startIndex
  let currentIndex = startIndex;
  const arrayLength = array.length;

  // Iterate through the array starting from currentIndex + 1
  while (++currentIndex < arrayLength) {
    // If the current element matches the target value, return its index
    if (array[currentIndex] === targetValue) {
      return currentIndex;
    }
  }

  // If the target value is not found, return -1
  return -1;
}

module.exports = findValueIndexFromPosition;