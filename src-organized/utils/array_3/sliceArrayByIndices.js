/**
 * Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included).
 * Handles negative indices for start and end, similar to Array.prototype.slice.
 *
 * @param {Array} array - The source array to slice.
 * @param {number} startIndex - The zero-based index at which to begin extraction. a negative index indicates an offset from the end of the array.
 * @param {number} endIndex - The zero-based index before which to end extraction. slice extracts up to but not including endIndex. a negative index indicates an offset from the end of the array.
 * @returns {Array} a new array containing the extracted elements.
 */
function sliceArrayByIndices(array, startIndex, endIndex) {
  let resultIndex = 0;
  const arrayLength = array.length;

  // Handle negative startIndex
  if (startIndex < 0) {
    startIndex = -startIndex > arrayLength ? 0 : arrayLength + startIndex;
  }

  // Clamp endIndex to array length, handle negative endIndex
  endIndex = endIndex > arrayLength ? arrayLength : endIndex;
  if (endIndex < 0) {
    endIndex += arrayLength;
  }

  // Calculate the number of elements to extract
  const sliceLength = startIndex > endIndex ? 0 : (endIndex - startIndex) >>> 0;
  startIndex >>>= 0; // Ensure startIndex is a non-negative integer

  const slicedArray = Array(sliceLength);
  while (resultIndex < sliceLength) {
    slicedArray[resultIndex] = array[resultIndex + startIndex];
    resultIndex++;
  }

  return slicedArray;
}

module.exports = sliceArrayByIndices;