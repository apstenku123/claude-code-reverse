/**
 * Decodes a hexadecimal-encoded string into a Uint8Array of bytes.
 *
 * @param {string} hexString - The hexadecimal string to decode. Must have an even length.
 * @returns {Uint8Array} The decoded bytes as a Uint8Array.
 * @throws {Error} If the input string has an odd length or contains invalid hex sequences.
 */
function decodeHexStringToByteArray(hexString) {
  // Ensure the hex string has an even number of characters
  if (hexString.length % 2 !== 0) {
    throw new Error("Hex encoded strings must have an even number length");
  }

  // Prepare a byte array to hold the decoded values
  const byteArray = new Uint8Array(hexString.length / 2);

  // Iterate over the hex string two characters at a time
  for (let index = 0; index < hexString.length; index += 2) {
    // Extract the current two-character hex sequence and normalize to lowercase
    const hexPair = hexString.slice(index, index + 2).toLowerCase();

    // Lookup the byte value for the hex pair in the sT1 mapping
    if (hexPair in sT1) {
      byteArray[index / 2] = sT1[hexPair];
    } else {
      // Throw an error if the hex pair is not recognized
      throw new Error(`Cannot decode unrecognized sequence ${hexPair} as hexadecimal`);
    }
  }

  return byteArray;
}

module.exports = decodeHexStringToByteArray;