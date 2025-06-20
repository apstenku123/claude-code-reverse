/**
 * Creates a shallow copy of an array starting from a specified index.
 *
 * @param {Array} sourceArray - The array to copy elements from.
 * @param {number} [startIndex=0] - The index to start copying from. Defaults to 0 if not provided.
 * @returns {Array} a new array containing elements from sourceArray starting at startIndex.
 */
function copyArrayFromIndex(sourceArray, startIndex = 0) {
  const resultArray = [];
  // Iterate from startIndex to the end of sourceArray
  for (let sourceIdx = startIndex, resultIdx = 0; sourceIdx < sourceArray.length; sourceIdx += 1, resultIdx += 1) {
    resultArray[resultIdx] = sourceArray[sourceIdx];
  }
  return resultArray;
}

module.exports = copyArrayFromIndex;