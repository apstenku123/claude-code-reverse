/**
 * Converts a Uint8Array (or similar byte array) into a string by mapping each byte value
 * to a corresponding character in the external 'khA' array.
 *
 * @param {Uint8Array} byteArray - The input byte array to convert.
 * @returns {string} The resulting string after mapping each byte to its corresponding character.
 */
function convertByteArrayToKhAString(byteArray) {
  let resultString = "";
  // Iterate through each byte in the array
  for (let byteIndex = 0; byteIndex < byteArray.byteLength; byteIndex++) {
    // Map the byte value to a character using the external khA array
    resultString += khA[byteArray[byteIndex]];
  }
  return resultString;
}

module.exports = convertByteArrayToKhAString;