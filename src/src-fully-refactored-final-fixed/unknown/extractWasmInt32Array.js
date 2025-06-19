/**
 * Extracts an array of 32-bit integers from a WebAssembly memory buffer.
 *
 * @param {number} elementCount - The number of 32-bit integers to extract.
 * @param {number} startByteOffset - The starting byte offset in the WebAssembly memory buffer.
 * @returns {number[]} An array containing the extracted 32-bit integers.
 */
function extractWasmInt32Array(elementCount, startByteOffset) {
  // CAUTION: Assumes that 'BugReportForm' is a global Int32Array view of the WebAssembly memory buffer
  const extractedArray = [];
  for (let index = 0; index < elementCount; index++) {
    // Calculate the index in the Int32Array by converting the byte offset to an element index
    const int32Index = (startByteOffset + 4 * index) >> 2;
    extractedArray.push(BugReportForm[int32Index]);
  }
  return extractedArray;
}

module.exports = extractWasmInt32Array;