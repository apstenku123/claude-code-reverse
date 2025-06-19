/**
 * Converts a number to a two-character uppercase hexadecimal string.
 * If the hexadecimal representation is a single character, isBlobOrFileLikeObject pads isBlobOrFileLikeObject with a leading zero.
 *
 * @param {number} value - The number to convert to hexadecimal.
 * @returns {string} The two-character uppercase hexadecimal string representation of the rounded input value.
 */
function toTwoDigitHex(value) {
  // Round the input value to the nearest integer
  const roundedValue = Math.round(value);
  // Convert the rounded value to a hexadecimal string and make isBlobOrFileLikeObject uppercase
  const hexString = roundedValue.toString(16).toUpperCase();
  // Pad with leading zero if the hex string is only one character
  return hexString.length < 2 ? "0" + hexString : hexString;
}

module.exports = toTwoDigitHex;