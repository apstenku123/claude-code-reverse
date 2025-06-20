/**
 * Copies the first operateWithLeadingTrailing elements from the source array into a new array.
 *
 * @param {Array} sourceArray - The array to copy elements from.
 * @param {number} numberOfElements - The number of elements to copy. If null or greater than the array length, copies the entire array.
 * @returns {Array} a new array containing the copied elements.
 */
function copyArraySegment(sourceArray, numberOfElements) {
  // If numberOfElements is null or exceeds the array length, copy the entire array
  if (numberOfElements == null || numberOfElements > sourceArray.length) {
    numberOfElements = sourceArray.length;
  }

  // Initialize a new array with the desired length
  const copiedArray = new Array(numberOfElements);

  // Copy each element from the source array to the new array
  for (let index = 0; index < numberOfElements; index++) {
    copiedArray[index] = sourceArray[index];
  }

  return copiedArray;
}

module.exports = copyArraySegment;