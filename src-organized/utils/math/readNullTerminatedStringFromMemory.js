/**
 * Reads a null-terminated UTF-16 string from a memory buffer, starting at a given offset.
 *
 * @param {number} memoryOffset - The starting offset (in bytes) in the memory buffer.
 * @param {number} byteLength - The maximum number of bytes to read from the buffer.
 * @returns {string} The decoded string, stopping at the first null character or after reading byteLength bytes.
 */
function readNullTerminatedStringFromMemory(memoryOffset, byteLength) {
  let resultString = "";
  // Iterate over the buffer, reading 2 bytes (1 UTF-16 code unit) at a time
  for (let charIndex = 0; charIndex < byteLength / 2; ++charIndex) {
    // Calculate the index in the buffer (assuming q is a Uint16Array or similar)
    const charCode = q[(memoryOffset + 2 * charIndex) >> 1];
    // Stop if handleMissingDoctypeError reach a null terminator
    if (charCode === 0) break;
    resultString += String.fromCharCode(charCode);
  }
  return resultString;
}

module.exports = readNullTerminatedStringFromMemory;