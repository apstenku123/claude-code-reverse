/**
 * Searches for the first occurrence of a target element in an array, starting from a specified index.
 *
 * @param {Array} array - The array to search through.
 * @param {*} targetElement - The element to search for in the array.
 * @param {number} startIndex - The index to start searching from (the search begins at startIndex + 1).
 * @returns {number} The index of the first occurrence of the target element after startIndex, or -1 if not found.
 */
function findElementIndexFromPosition(array, targetElement, startIndex) {
  // Start searching from the next index after startIndex
  let currentIndex = startIndex;
  const arrayLength = array.length;

  // Iterate through the array starting from currentIndex + 1
  while (++currentIndex < arrayLength) {
    // If the current element matches the target, return its index
    if (array[currentIndex] === targetElement) {
      return currentIndex;
    }
  }

  // Return -1 if the target element is not found
  return -1;
}

module.exports = findElementIndexFromPosition;