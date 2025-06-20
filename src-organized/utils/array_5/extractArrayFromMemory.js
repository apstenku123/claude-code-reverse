/**
 * Extracts an array of values from a global memory buffer, starting at a specified offset.
 *
 * @param {number} elementCount - The number of elements to extract from memory.
 * @param {number} startOffset - The starting offset in the memory buffer (in bytes).
 * @returns {Array<number>} An array containing the extracted values.
 */
function extractArrayFromMemory(elementCount, startOffset) {
  // CAUTION: Assumes global variable BugReportForm is a typed array or similar memory buffer
  const extractedValues = [];
  for (let index = 0; index < elementCount; index++) {
    // Calculate the memory address for the current element
    // Each element is assumed to be 4 bytes (e.g., Int32)
    const memoryAddress = startOffset + 4 * index;
    // Use bitwise right shift by 2 to convert byte offset to index (divide by 4)
    const bufferIndex = memoryAddress >> 2;
    extractedValues.push(BugReportForm[bufferIndex]);
  }
  return extractedValues;
}

module.exports = extractArrayFromMemory;