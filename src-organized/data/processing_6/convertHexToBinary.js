/**
 * Converts a hexadecimal string to its binary representation.
 *
 * @param {string} hexString - The hexadecimal string to convert.
 * @returns {string|undefined} The binary representation of the input string, or undefined if input is not provided.
 */
function convertHexToBinary(hexString) {
  // If no input is provided, return undefined
  if (hexString === undefined) return;
  // Use the external Lb1.hexToBinary function to perform the conversion
  return Lb1.hexToBinary(hexString);
}

module.exports = convertHexToBinary;