/**
 * Extracts a string from a buffer-like array, starting at a given offset and reading up to a specified length.
 * Reads 16-bit values from the global buffer 'q', converts them to characters, and concatenates them into a string.
 * Stops reading if a zero value (null terminator) is encountered.
 *
 * @param {number} startOffset - The starting index in the buffer (k1 in original code).
 * @param {number} byteLength - The number of bytes to read from the buffer (P1 in original code).
 * @returns {string} The extracted string, or an empty string if no characters are found.
 */
function extractStringFromBuffer(startOffset, byteLength) {
  let resultString = "";
  // Loop through half the byteLength, since each character is 2 bytes (16 bits)
  for (let charIndex = 0; charIndex < byteLength / 2; ++charIndex) {
    // Calculate the buffer index for the current character
    const bufferIndex = (startOffset + 2 * charIndex) >> 1;
    // Read the 16-bit value from the buffer
    const charCode = q[bufferIndex];
    // Stop if null terminator is encountered
    if (charCode === 0) break;
    // Append the character to the result string
    resultString += String.fromCharCode(charCode);
  }
  return resultString;
}

module.exports = extractStringFromBuffer;