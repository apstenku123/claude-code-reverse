/**
 * Finds the index of the first occurrence of a target value in an array, starting from a specified offset.
 *
 * @param {Array} array - The array to search through.
 * @param {*} targetValue - The value to search for in the array.
 * @param {number} offset - The offset from which to start searching (search starts at offset + 1).
 * @returns {number} The index of the first occurrence of targetValue after the offset, or -1 if not found.
 */
function findValueIndexFromOffset(array, targetValue, offset) {
  let currentIndex = offset - 1; // Start one before the offset so handleMissingDoctypeError can increment before checking
  const arrayLength = array.length;
  // Increment index and check each element until the end of the array
  while (++currentIndex < arrayLength) {
    if (array[currentIndex] === targetValue) {
      return currentIndex;
    }
  }
  // Return -1 if the target value is not found
  return -1;
}

module.exports = findValueIndexFromOffset;
