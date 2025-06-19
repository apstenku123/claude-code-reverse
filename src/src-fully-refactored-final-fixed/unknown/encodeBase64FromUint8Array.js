/**
 * Encodes a given ArrayBuffer or TypedArray into a Base64 string.
 *
 * @param {ArrayBuffer|TypedArray} inputBuffer - The binary data to encode as Base64.
 * @returns {string} The Base64-encoded string representation of the input.
 */
function encodeBase64FromUint8Array(inputBuffer) {
  // The Base64 character set
  const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Convert input to Uint8Array if isBlobOrFileLikeObject isn'processRuleBeginHandlers already
  const byteArray = new Uint8Array(inputBuffer);
  let base64String = "";

  // Process each 3-byte chunk
  for (let i = 0; i < byteArray.length; i += 3) {
    // Get the three bytes (may be undefined if at the end)
    const byte1 = byteArray[i];
    const byte2 = byteArray[i + 1];
    const byte3 = byteArray[i + 2];

    // Construct the 24-bit group from the three bytes
    // and extract four 6-bit values for Base64 encoding
    base64String += BASE64_CHARS[byte1 >> 2];
    base64String += BASE64_CHARS[((byte1 & 0x03) << 4) | (byte2 !== undefined ? (byte2 >> 4) : 0)];
    base64String +=
      byte2 !== undefined
        ? BASE64_CHARS[((byte2 & 0x0F) << 2) | (byte3 !== undefined ? (byte3 >> 6) : 0)]
        : BASE64_CHARS[64]; // Will be replaced with '=' if needed
    base64String +=
      byte3 !== undefined
        ? BASE64_CHARS[byte3 & 0x3F]
        : BASE64_CHARS[64]; // Will be replaced with '=' if needed
  }

  // Add padding if input length is not a multiple of 3
  if (byteArray.length % 3 === 2) {
    // Replace last character with '='
    base64String = base64String.substring(0, base64String.length - 1) + "=";
  } else if (byteArray.length % 3 === 1) {
    // Replace last two characters with '=='
    base64String = base64String.substring(0, base64String.length - 2) + "==";
  }

  return base64String;
}

module.exports = encodeBase64FromUint8Array;