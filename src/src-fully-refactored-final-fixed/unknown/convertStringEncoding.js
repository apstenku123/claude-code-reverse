/**
 * Converts the input string to the specified encoding.
 *
 * If the encoding is 'base64', the string is converted to Base64 using c82.toBase64.
 * Otherwise, the string is converted to UTF-8 using l82.toUtf8.
 *
 * @param {string} inputString - The string to be converted.
 * @param {string} [encoding="utf-8"] - The target encoding ('base64' or 'utf-8').
 * @returns {string} The encoded string in the specified format.
 */
function convertStringEncoding(inputString, encoding = "utf-8") {
  // If encoding is 'base64', use c82.toBase64 to convert
  if (encoding === "base64") {
    return c82.toBase64(inputString);
  }
  // Otherwise, default to UTF-8 conversion
  return l82.toUtf8(inputString);
}

module.exports = convertStringEncoding;