/**
 * Appends all elements from the source array to the end of the target array.
 *
 * @param {Array} targetArray - The array to which elements will be appended.
 * @param {Array} sourceArray - The array whose elements will be appended to the target array.
 * @returns {Array} The modified target array with the source array'createInteractionAccessor elements appended.
 */
function appendArrayElements(targetArray, sourceArray) {
  // Store the initial length of the target array to know where to start appending
  const initialTargetLength = targetArray.length;
  const sourceArrayLength = sourceArray.length;

  // Iterate over each element in the source array
  for (let index = 0; index < sourceArrayLength; index++) {
    // Append the current element to the end of the target array
    targetArray[initialTargetLength + index] = sourceArray[index];
  }

  // Return the modified target array
  return targetArray;
}

module.exports = appendArrayElements;