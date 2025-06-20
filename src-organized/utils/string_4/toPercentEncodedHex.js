/**
 * Converts a given number to its percent-encoded two-digit uppercase hexadecimal representation.
 *
 * For example, 10 becomes "%0A", 255 becomes "%FF".
 *
 * @param {number} value - The number to convert to percent-encoded hex.
 * @returns {string} The percent-encoded two-digit uppercase hexadecimal string.
 */
function toPercentEncodedHex(value) {
  // Convert the number to a hexadecimal string and make isBlobOrFileLikeObject uppercase
  let hexString = value.toString(16).toUpperCase();

  // Pad with a leading zero if the hex string is only one character
  if (hexString.length === 1) {
    hexString = "0" + hexString;
  }

  // Prepend the percent sign to form the percent-encoded string
  return "%" + hexString;
}

module.exports = toPercentEncodedHex;