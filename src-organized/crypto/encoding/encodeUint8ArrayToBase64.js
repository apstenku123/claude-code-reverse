/**
 * Encodes a given input (ArrayBuffer, Buffer, or array-like) as a Base64 string.
 *
 * @param {ArrayBuffer|Uint8Array|Buffer} inputBytes - The binary data to encode.
 * @returns {string} The Base64-encoded string representation of the input.
 */
function encodeUint8ArrayToBase64(inputBytes) {
  // The Base64 character set
  const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Ensure input is a Uint8Array
  const byteArray = new Uint8Array(inputBytes);
  let base64String = "";

  // Process each 3-byte chunk
  for (let i = 0; i < byteArray.length; i += 3) {
    // Get the three bytes (may be undefined if at the end)
    const byte1 = byteArray[i];
    const byte2 = byteArray[i + 1];
    const byte3 = byteArray[i + 2];

    // Convert the three bytes into four 6-bit numbers
    const base64Char1 = BASE64_CHARS[byte1 >> 2];
    const base64Char2 = BASE64_CHARS[((byte1 & 0x03) << 4) | ((byte2 !== undefined ? byte2 : 0) >> 4)];
    const base64Char3 = BASE64_CHARS[((byte2 !== undefined ? (byte2 & 0x0F) : 0) << 2) | ((byte3 !== undefined ? byte3 : 0) >> 6)];
    const base64Char4 = BASE64_CHARS[byte3 !== undefined ? (byte3 & 0x3F) : 0];

    base64String += base64Char1 + base64Char2 + base64Char3 + base64Char4;
  }

  // Add padding if necessary
  if (byteArray.length % 3 === 2) {
    // If two bytes remain, pad with '='
    base64String = base64String.substring(0, base64String.length - 1) + "=";
  } else if (byteArray.length % 3 === 1) {
    // If one byte remains, pad with '=='
    base64String = base64String.substring(0, base64String.length - 2) + "==";
  }

  return base64String;
}

module.exports = encodeUint8ArrayToBase64;