/**
 * Decodes a hexadecimal-encoded string into a Uint8Array.
 *
 * The input string must have an even length, as each pair of characters represents a single byte.
 * Each two-character hex sequence is mapped to its corresponding byte value using the sT1 lookup table.
 * Throws an error if the string length is odd or if any sequence is not a recognized hex value.
 *
 * @param {string} hexString - The hexadecimal-encoded string to decode.
 * @returns {Uint8Array} The decoded byte array.
 * @throws {Error} If the input string length is not even or contains invalid hex sequences.
 */
function decodeHexStringToUint8Array(hexString) {
  // Ensure the hex string has an even number of characters
  if (hexString.length % 2 !== 0) {
    throw new Error("Hex encoded strings must have an even number length");
  }

  // Prepare a Uint8Array to hold the decoded bytes
  const byteArray = new Uint8Array(hexString.length / 2);

  // Iterate over the string, processing two characters at a time
  for (let i = 0; i < hexString.length; i += 2) {
    // Extract the current two-character hex sequence and normalize to lowercase
    const hexPair = hexString.slice(i, i + 2).toLowerCase();

    // Look up the byte value for this hex pair
    if (hexPair in sT1) {
      byteArray[i / 2] = sT1[hexPair];
    } else {
      // Throw an error if the hex pair is not recognized
      throw new Error(`Cannot decode unrecognized sequence ${hexPair} as hexadecimal`);
    }
  }

  return byteArray;
}

module.exports = decodeHexStringToUint8Array;