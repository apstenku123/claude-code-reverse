/**
 * Searches for the last occurrence of a specified value within an array, up to a given index.
 *
 * @param {Array<any>} array - The array to search within.
 * @param {any} searchValue - The value to search for in the array.
 * @param {number} maxIndex - The highest index (inclusive) to search up to.
 * @returns {number} The index of the last occurrence of searchValue within the array up to maxIndex, or -1 if not found.
 */
function findLastIndexOfValue(array, searchValue, maxIndex) {
  // Start searching from maxIndex down to 0
  let currentIndex = maxIndex + 1;
  while (currentIndex--) {
    if (array[currentIndex] === searchValue) {
      return currentIndex;
    }
  }
  // If not found, returns -1
  return currentIndex;
}

module.exports = findLastIndexOfValue;