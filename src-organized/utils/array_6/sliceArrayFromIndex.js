/**
 * Returns a shallow copy of a portion of an array starting from the specified index.
 *
 * @param {Array} array - The source array to slice from.
 * @param {number} [startIndex=0] - The index at which to start slicing. Defaults to 0 if not provided.
 * @returns {Array} a new array containing the elements from startIndex to the end of the source array.
 */
function sliceArrayFromIndex(array, startIndex = 0) {
  const result = [];
  // Iterate from the startIndex to the end of the array
  for (let sourceIdx = startIndex, resultIdx = 0; sourceIdx < array.length; sourceIdx += 1, resultIdx += 1) {
    result[resultIdx] = array[sourceIdx];
  }
  return result;
}

module.exports = sliceArrayFromIndex;