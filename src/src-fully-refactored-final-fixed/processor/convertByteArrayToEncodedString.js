/**
 * Converts a Uint8Array (or similar byte array) into a string by mapping each byte value
 * to a corresponding character using the external khA lookup array.
 *
 * @param {Uint8Array} byteArray - The input array of bytes to be converted.
 * @returns {string} The resulting string after mapping each byte to a character.
 */
function convertByteArrayToEncodedString(byteArray) {
  let encodedString = "";
  // Iterate over each byte in the array
  for (let byteIndex = 0; byteIndex < byteArray.byteLength; byteIndex++) {
    // Map the byte value to a character using khA lookup and append to result
    encodedString += khA[byteArray[byteIndex]];
  }
  return encodedString;
}

module.exports = convertByteArrayToEncodedString;