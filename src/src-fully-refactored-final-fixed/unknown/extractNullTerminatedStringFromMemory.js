/**
 * Extracts a null-terminated UTF-16 string from a memory buffer.
 *
 * @param {number} startOffset - The starting offset (in bytes) within the memory buffer.
 * @param {number} byteLength - The maximum number of bytes to read from the buffer.
 * @returns {string} The extracted string, terminated at the first null character or after reading byteLength bytes.
 *
 * Assumes that the global variable `q` is a Uint16Array or similar array-like object representing memory.
 */
function extractNullTerminatedStringFromMemory(startOffset, byteLength) {
  let resultString = "";
  // Iterate through the buffer, reading 2 bytes (1 UTF-16 code unit) at a time
  for (let charIndex = 0; charIndex < byteLength / 2; ++charIndex) {
    // Calculate the index in the memory buffer (assuming 2 bytes per character)
    const memoryIndex = (startOffset + 2 * charIndex) >> 1;
    const charCode = q[memoryIndex];
    // Stop if null terminator is found
    if (charCode === 0) break;
    resultString += String.fromCharCode(charCode);
  }
  return resultString;
}

module.exports = extractNullTerminatedStringFromMemory;