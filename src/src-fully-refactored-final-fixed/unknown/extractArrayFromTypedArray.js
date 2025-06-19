/**
 * Extracts a sequence of values from a global typed array (BugReportForm), starting at a given offset.
 * Each value is read every 4 bytes (assuming 32-bit values), for a specified count.
 *
 * @param {number} valueCount - The number of values to extract from the typed array.
 * @param {number} startOffset - The starting byte offset in the typed array.
 * @returns {number[]} An array containing the extracted values.
 */
function extractArrayFromTypedArray(valueCount, startOffset) {
  const extractedValues = [];
  // Iterate valueCount times, extracting each value from the global array BugReportForm
  for (let index = 0; index < valueCount; index++) {
    // Calculate the position in BugReportForm: startOffset + 4 * index, then convert from byte offset to index (divide by 4)
    const arrayIndex = (startOffset + 4 * index) >> 2;
    extractedValues.push(BugReportForm[arrayIndex]);
  }
  return extractedValues;
}

module.exports = extractArrayFromTypedArray;