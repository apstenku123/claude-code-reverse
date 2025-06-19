/**
 * Returns a new array with the first element removed, or an empty array if the input is null or empty.
 *
 * @param {Array} inputArray - The array to process.
 * @returns {Array} a new array without the first element, or an empty array if input is null or empty.
 */
function getArrayWithoutFirstElement(inputArray) {
  // Check if inputArray is null/undefined or has no length
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  // If array has elements, call a2A to remove the first element; otherwise, return an empty array
  return arrayLength ? a2A(inputArray, 1) : [];
}

module.exports = getArrayWithoutFirstElement;