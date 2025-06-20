/**
 * Converts a hexadecimal string into a Uint8Array of bytes.
 * Each pair of hexadecimal characters in the input string is parsed into a single byte.
 *
 * @param {string} hexString - The hexadecimal string to convert. Must have even length.
 * @returns {Uint8Array} a Uint8Array containing the bytes represented by the hex string.
 */
function hexStringToByteArray(hexString) {
  // Each byte is represented by two hex characters
  const byteArrayLength = hexString.length / 2;
  const byteArray = new Uint8Array(byteArrayLength);
  let byteIndex = 0;

  for (let i = 0; i < hexString.length; i += 2) {
    // Convert each hex character to its numeric value using hexCharCodeToDecimalValue
    const highNibble = hexCharCodeToDecimalValue(hexString.charCodeAt(i));      // High 4 bits
    const lowNibble = hexCharCodeToDecimalValue(hexString.charCodeAt(i + 1));   // Low 4 bits
    // Combine the two nibbles into a single byte
    byteArray[byteIndex++] = (highNibble << 4) | lowNibble;
  }

  return byteArray;
}

module.exports = hexStringToByteArray;