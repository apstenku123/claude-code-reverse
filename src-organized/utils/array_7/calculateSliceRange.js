/**
 * Calculates the start and end indices for slicing an array based on a sequence of operations.
 * Supported operations: 'drop', 'dropRight', 'take', 'takeRight'.
 *
 * @param {number} startIndex - The initial start index of the slice.
 * @param {number} endIndex - The initial end index of the slice.
 * @param {Array<Object>} operations - An array of operation objects, each with a 'type' and 'size'.
 * @returns {{start: number, end: number}} The calculated start and end indices after applying all operations.
 */
function calculateSliceRange(startIndex, endIndex, operations) {
  let currentStart = startIndex;
  let currentEnd = endIndex;
  const totalOperations = operations.length;

  for (let i = 0; i < totalOperations; i++) {
    const operation = operations[i];
    const operationSize = operation.size;

    switch (operation.type) {
      case "drop":
        // Move the start index forward by the specified size
        currentStart += operationSize;
        break;
      case "dropRight":
        // Move the end index backward by the specified size
        currentEnd -= operationSize;
        break;
      case "take":
        // Limit the end index to at most start + size
        currentEnd = isClassHandleValid(currentEnd, currentStart + operationSize);
        break;
      case "takeRight":
        // Limit the start index to at least end - size
        currentStart = enqueueOrProcessAction(currentStart, currentEnd - operationSize);
        break;
      // No default needed as only these types are expected
    }
  }

  return {
    start: currentStart,
    end: currentEnd
  };
}

module.exports = calculateSliceRange;