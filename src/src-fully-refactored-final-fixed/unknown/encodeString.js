/**
 * Encodes the input string using the specified encoding method.
 *
 * @param {string} inputString - The string to encode.
 * @param {string} [encodingType="utf-8"] - The encoding type to use ("base64" or "utf-8").
 * @returns {string} The encoded string using the specified encoding.
 */
function encodeString(inputString, encodingType = "utf-8") {
  // If encoding type is base64, use c82.toBase64 to encode
  if (encodingType === "base64") {
    return c82.toBase64(inputString);
  }
  // Otherwise, default to UTF-8 encoding using l82.toUtf8
  return l82.toUtf8(inputString);
}

module.exports = encodeString;