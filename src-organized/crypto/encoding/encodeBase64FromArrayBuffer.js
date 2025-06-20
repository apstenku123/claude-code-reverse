/**
 * Encodes an ArrayBuffer or TypedArray into a Base64 string using a custom character set.
 *
 * @param {ArrayBuffer|TypedArray} inputBuffer - The binary data to encode.
 * @param {string[]} base64Table - Array of 64 characters used for Base64 encoding (e.g., standard Base64 table).
 * @returns {string} The Base64-encoded string representation of the input.
 */
function encodeBase64FromArrayBuffer(inputBuffer, base64Table) {
  // Ensure input is a Uint8Array
  const byteArray = new Uint8Array(inputBuffer);
  let base64String = "";

  // Process each 3-byte chunk
  for (let byteIndex = 0; byteIndex < byteArray.length; byteIndex += 3) {
    // Extract three bytes (may be undefined if at the end)
    const byte1 = byteArray[byteIndex];
    const byte2 = byteArray[byteIndex + 1];
    const byte3 = byteArray[byteIndex + 2];

    // Encode the first 6 bits of byte1
    base64String += base64Table[byte1 >> 2];
    // Encode the remaining 2 bits of byte1 and the first 4 bits of byte2
    base64String += base64Table[((byte1 & 0x03) << 4) | (byte2 !== undefined ? (byte2 >> 4) : 0)];
    // Encode the remaining 4 bits of byte2 and the first 2 bits of byte3
    if (byte2 !== undefined) {
      base64String += base64Table[((byte2 & 0x0F) << 2) | (byte3 !== undefined ? (byte3 >> 6) : 0)];
    } else {
      base64String += base64Table[0];
    }
    // Encode the remaining 6 bits of byte3
    if (byte3 !== undefined) {
      base64String += base64Table[byte3 & 0x3F];
    } else {
      base64String += base64Table[0];
    }
  }

  // Add padding if necessary
  if (byteArray.length % 3 === 2) {
    // One padding character needed
    base64String = base64String.substring(0, base64String.length - 1) + "=";
  } else if (byteArray.length % 3 === 1) {
    // Two padding characters needed
    base64String = base64String.substring(0, base64String.length - 2) + "==";
  }

  return base64String;
}

module.exports = encodeBase64FromArrayBuffer;