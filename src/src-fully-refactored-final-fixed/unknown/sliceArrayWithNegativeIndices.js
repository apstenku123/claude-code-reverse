/**
 * Extracts a shallow copy of a portion of an array, handling negative start and end indices.
 *
 * @param {Array} sourceArray - The array to slice from.
 * @param {number} startIndex - The index at which to begin extraction. Negative values count from the end.
 * @param {number} endIndex - The index before which to end extraction. Negative values count from the end.
 * @returns {Array} a new array containing the extracted elements.
 */
function sliceArrayWithNegativeIndices(sourceArray, startIndex, endIndex) {
  let currentIndex = 0;
  const arrayLength = sourceArray.length;

  // Handle negative start index
  let normalizedStartIndex = startIndex;
  if (normalizedStartIndex < 0) {
    normalizedStartIndex = -normalizedStartIndex > arrayLength ? 0 : arrayLength + normalizedStartIndex;
  }

  // Handle end index out of bounds and negative end index
  let normalizedEndIndex = endIndex > arrayLength ? arrayLength : endIndex;
  if (normalizedEndIndex < 0) {
    normalizedEndIndex += arrayLength;
  }

  // Calculate the number of elements to extract
  const sliceLength = normalizedStartIndex > normalizedEndIndex ? 0 : (normalizedEndIndex - normalizedStartIndex) >>> 0;
  // Ensure start index is a non-negative integer
  normalizedStartIndex >>>= 0;

  const resultArray = Array(sliceLength);
  // Copy elements from sourceArray to resultArray
  while (currentIndex < sliceLength) {
    resultArray[currentIndex] = sourceArray[currentIndex + normalizedStartIndex];
    currentIndex++;
  }

  return resultArray;
}

module.exports = sliceArrayWithNegativeIndices;