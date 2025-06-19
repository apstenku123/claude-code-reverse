/**
 * Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included).
 * Handles negative indices for start and end, similar to Array.prototype.slice.
 *
 * @param {Array} array - The array to slice.
 * @param {number} startIndex - The beginning index of the specified portion of the array. Can be negative to indicate an offset from the end.
 * @param {number} endIndex - The end index (not included) of the specified portion of the array. Can be negative to indicate an offset from the end.
 * @returns {Array} a new array containing the extracted elements.
 */
function sliceArrayByRange(array, startIndex, endIndex) {
  let resultIndex = -1;
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
  while (++resultIndex < sliceLength) {
    slicedArray[resultIndex] = array[resultIndex + startIndex];
  }
  return slicedArray;
}

module.exports = sliceArrayByRange;