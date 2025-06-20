/**
 * Copies elements from the source array into a target array.
 * If the target array is not provided, a new array of the same length is created.
 *
 * @param {Array} sourceArray - The array whose elements will be copied.
 * @param {Array} [targetArray] - Optional. The array to copy elements into. If not provided, a new array is created.
 * @returns {Array} The array containing the copied elements.
 */
function copyArrayElements(sourceArray, targetArray) {
  const sourceLength = sourceArray.length;
  // If no target array is provided, create a new array of the same length
  if (!targetArray) {
    targetArray = new Array(sourceLength);
  }
  // Copy each element from the source array to the target array
  for (let index = 0; index < sourceLength; index++) {
    targetArray[index] = sourceArray[index];
  }
  return targetArray;
}

module.exports = copyArrayElements;