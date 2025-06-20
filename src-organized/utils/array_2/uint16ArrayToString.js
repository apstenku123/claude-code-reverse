/**
 * Converts a Uint16Array (or array-like of 16-bit code units) to a string.
 * Handles large arrays by processing in chunks to avoid stack overflow.
 *
 * @param {Uint16Array} uint16Array - The array of 16-bit code units to convert to a string.
 * @returns {string} The resulting string from the code units.
 */
function uint16ArrayToString(uint16Array) {
  const totalLength = uint16Array.length;
  // If the array is small enough, convert all at once
  if (totalLength < 65535) {
    return String.fromCharCode.apply(null, uint16Array);
  }

  let resultString = "";
  let currentIndex = 0;
  const maxChunkSize = 65535;

  // Process the array in chunks to avoid exceeding argument limits
  while (currentIndex < totalLength) {
    // Adjust chunk size if remaining elements are less than maxChunkSize
    let chunkSize = Math.min(maxChunkSize, totalLength - currentIndex);
    // Convert current chunk to string and append
    resultString += String.fromCharCode.apply(
      null,
      uint16Array.subarray(currentIndex, currentIndex + chunkSize)
    );
    currentIndex += chunkSize;
  }

  return resultString;
}

module.exports = uint16ArrayToString;