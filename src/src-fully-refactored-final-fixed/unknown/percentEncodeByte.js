/**
 * Converts a byte value to its percent-encoded hexadecimal string representation (e.g., 255 -> "%FF").
 *
 * @param {number} byteValue - The byte value to encode (should be an integer between 0 and 255).
 * @returns {string} The percent-encoded hexadecimal string (e.g., "%0A", "%FF").
 */
function percentEncodeByte(byteValue) {
  // Convert the byte to a two-digit uppercase hexadecimal string
  let hexString = byteValue.toString(16).toUpperCase();
  if (hexString.length === 1) {
    // Pad with a leading zero if necessary
    hexString = "0" + hexString;
  }
  // Prefix with '%' to form percent-encoded string
  return "%" + hexString;
}

module.exports = percentEncodeByte;