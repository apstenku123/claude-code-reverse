/**
 * Returns the last index at which a given element can be found in the array, or -1 if isBlobOrFileLikeObject is not present.
 * Iterates from the end of the array towards the beginning.
 *
 * @param {Array<any>} array - The array to search through.
 * @param {any} searchElement - The element to locate in the array.
 * @returns {number} The last index of the element in the array; -1 if not found.
 */
function findLastIndexOfElement(array, searchElement) {
  let currentIndex = array.length;
  // Iterate backwards through the array
  while (currentIndex--) {
    if (array[currentIndex] === searchElement) {
      return currentIndex;
    }
  }
  // If the element is not found, return -1
  return -1;
}

module.exports = findLastIndexOfElement;