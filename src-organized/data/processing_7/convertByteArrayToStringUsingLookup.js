/**
 * Converts a Uint8Array (or similar byte array) into a string by mapping each byte value
 * to a corresponding character using the external lookup table 'khA'.
 *
 * @param {Uint8Array} byteArray - The array of bytes to convert.
 * @returns {string} The resulting string after mapping each byte through 'khA'.
 */
function convertByteArrayToStringUsingLookup(byteArray) {
  let resultString = "";
  // Iterate over each byte in the array
  for (let byteIndex = 0; byteIndex < byteArray.byteLength; byteIndex++) {
    // Map the byte value to a character using the lookup table 'khA'
    resultString += khA[byteArray[byteIndex]];
  }
  return resultString;
}

module.exports = convertByteArrayToStringUsingLookup;