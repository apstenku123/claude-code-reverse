/**
 * Compares the first elements of two arrays and returns -1 if the first is less than the second, otherwise 1.
 * Useful as a comparator function for sorting arrays of arrays by their first element.
 *
 * @param {Array} firstArray - The first array to compare. The first element should be comparable (e.g., number or string).
 * @param {Array} secondArray - The second array to compare. The first element should be comparable (e.g., number or string).
 * @returns {number} Returns -1 if firstArray[0] < secondArray[0], otherwise returns 1.
 */
function compareFirstElements(firstArray, secondArray) {
  // Compare the first elements of each array
  return firstArray[0] < secondArray[0] ? -1 : 1;
}

module.exports = compareFirstElements;