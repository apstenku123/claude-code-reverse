/**
 * Converts a Uint8Array (or similar byte array) into a string by mapping each byte value
 * to a corresponding character using the external 'ge0' lookup table.
 *
 * @param {Uint8Array} byteArray - The array of bytes to convert.
 * @returns {string} The encoded string resulting from mapping each byte.
 */
function convertByteArrayToEncodedString(byteArray) {
  let encodedString = "";
  // Iterate through each byte in the array
  for (let byteIndex = 0; byteIndex < byteArray.byteLength; byteIndex++) {
    // Map the byte value to a character using the ge0 lookup table
    encodedString += ge0[byteArray[byteIndex]];
  }
  return encodedString;
}

module.exports = convertByteArrayToEncodedString;