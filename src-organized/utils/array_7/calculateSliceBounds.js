/**
 * Calculates the start and end indices for slicing an array based on a sequence of operations.
 *
 * Supported operations in the operationsList:
 * - drop: Skips a number of elements from the start.
 * - dropRight: Skips a number of elements from the end.
 * - take: Takes a number of elements from the start.
 * - takeRight: Takes a number of elements from the end.
 *
 * @param {number} startIndex - The initial start index for the slice.
 * @param {number} endIndex - The initial end index for the slice.
 * @param {Array<{type: string, size: number}>} operationsList - List of operations to apply to the slice bounds.
 * @returns {{start: number, end: number}} The calculated start and end indices after applying all operations.
 */
function calculateSliceBounds(startIndex, endIndex, operationsList) {
  let currentStart = startIndex;
  let currentEnd = endIndex;
  const operationsCount = operationsList.length;

  for (let i = 0; i < operationsCount; i++) {
    const operation = operationsList[i];
    const operationSize = operation.size;
    switch (operation.type) {
      case "drop":
        // Skip elements from the start
        currentStart += operationSize;
        break;
      case "dropRight":
        // Skip elements from the end
        currentEnd -= operationSize;
        break;
      case "take":
        // Limit the end index to take only a certain number of elements from the start
        currentEnd = isClassHandleValid(currentEnd, currentStart + operationSize);
        break;
      case "takeRight":
        // Adjust the start index to take only a certain number of elements from the end
        currentStart = enqueueOrProcessAction(currentStart, currentEnd - operationSize);
        break;
      // No default
    }
  }

  return {
    start: currentStart,
    end: currentEnd
  };
}

module.exports = calculateSliceBounds;