/**
 * Converts a Uint8Array (or similar byte array) to a string by mapping each byte value
 * to a corresponding character using the external c62 lookup table.
 *
 * @param {Uint8Array} byteArray - The array of bytes to convert.
 * @returns {string} The resulting string after mapping each byte.
 */
function convertByteArrayToString(byteArray) {
  let resultString = "";
  // Iterate over each byte in the array
  for (let byteIndex = 0; byteIndex < byteArray.byteLength; byteIndex++) {
    // Map the byte value to a character using the c62 lookup table
    resultString += c62[byteArray[byteIndex]];
  }
  return resultString;
}

module.exports = convertByteArrayToString;