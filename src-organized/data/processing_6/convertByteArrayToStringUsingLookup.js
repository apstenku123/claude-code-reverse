/**
 * Converts a Uint8Array (or similar byte array) into a string by mapping each byte value
 * to a character using the external ge0 lookup table.
 *
 * @param {Uint8Array} byteArray - The array of bytes to convert.
 * @returns {string} The resulting string after mapping each byte through ge0.
 */
function convertByteArrayToStringUsingLookup(byteArray) {
  let resultString = "";
  // Iterate over each byte in the array
  for (let byteIndex = 0; byteIndex < byteArray.byteLength; byteIndex++) {
    // Map the byte value to a character using the ge0 lookup table
    resultString += ge0[byteArray[byteIndex]];
  }
  return resultString;
}

module.exports = convertByteArrayToStringUsingLookup;