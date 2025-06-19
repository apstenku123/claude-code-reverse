/**
 * Searches for the first occurrence of a target value in an array, starting from a given index.
 *
 * @param {Array} array - The array to search within.
 * @param {*} targetValue - The value to search for in the array.
 * @param {number} startIndex - The index to start searching from (inclusive).
 * @returns {number} The index of the first occurrence of targetValue at or after startIndex, or -1 if not found.
 */
function findIndexFromPosition(array, targetValue, startIndex) {
  // Initialize the search index to one less than startIndex
  let searchIndex = startIndex - 1;
  const arrayLength = array.length;

  // Iterate through the array starting from startIndex
  while (++searchIndex < arrayLength) {
    // If the current element matches the target value, return its index
    if (array[searchIndex] === targetValue) {
      return searchIndex;
    }
  }
  // Return -1 if the target value is not found
  return -1;
}

module.exports = findIndexFromPosition;