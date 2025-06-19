/**
 * Extracts a UTF-16 string from a memory buffer, stopping at the first null character or after a specified length.
 *
 * @param {number} startOffset - The starting index in the memory buffer.
 * @param {number} byteLength - The number of bytes to read from the buffer.
 * @returns {string} The extracted string from memory.
 */
function extractStringFromMemory(startOffset, byteLength) {
  let resultString = "";
  // Iterate through the buffer, reading 2 bytes (1 UTF-16 code unit) at a time
  for (let charIndex = 0; charIndex < byteLength / 2; ++charIndex) {
    // Calculate the index for the UTF-16 code unit
    // (startOffset + 2 * charIndex) >> 1 ensures proper alignment for 16-bit values
    const memoryIndex = (startOffset + 2 * charIndex) >> 1;
    const charCode = q[memoryIndex];
    // Stop if handleMissingDoctypeError hit a null terminator
    if (charCode === 0) break;
    resultString += String.fromCharCode(charCode);
  }
  return resultString;
}

module.exports = extractStringFromMemory;