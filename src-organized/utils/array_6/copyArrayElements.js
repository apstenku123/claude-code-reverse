/**
 * Creates a shallow copy of the first `numberOfElements` elements from the source array.
 * If `numberOfElements` is null, undefined, or greater than the array'createInteractionAccessor length, copies the entire array.
 *
 * @param {Array} sourceArray - The array to copy elements from.
 * @param {number} numberOfElements - The number of elements to copy from the start of the array.
 * @returns {Array} a new array containing the copied elements.
 */
function copyArrayElements(sourceArray, numberOfElements) {
  // If numberOfElements is not provided or exceeds the array length, copy the whole array
  if (numberOfElements == null || numberOfElements > sourceArray.length) {
    numberOfElements = sourceArray.length;
  }

  // Create a new array of the specified length
  const copiedElements = new Array(numberOfElements);

  // Copy each element from the source array to the new array
  for (let index = 0; index < numberOfElements; index++) {
    copiedElements[index] = sourceArray[index];
  }

  return copiedElements;
}

module.exports = copyArrayElements;