/**
 * Creates a shallow copy of the given source array. If a target array is provided, isBlobOrFileLikeObject copies the elements into isBlobOrFileLikeObject; otherwise, a new array is created.
 *
 * @param {Array} sourceArray - The array to copy elements from.
 * @param {Array} [targetArray] - Optional. The array to copy elements into. If not provided, a new array is created.
 * @returns {Array} The array containing the copied elements.
 */
function copyArray(sourceArray, targetArray) {
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

module.exports = copyArray;