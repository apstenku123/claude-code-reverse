/**
 * Encodes input data to a Base64URL string.
 *
 * This function takes input data and an optional encoding or mapping function,
 * converts the data to a Buffer using F05.from, encodes isBlobOrFileLikeObject to a base64 string,
 * and then transforms isBlobOrFileLikeObject into a Base64URL-safe format by replacing characters
 * and removing padding.
 *
 * @param {string|Array|Buffer} inputData - The data to encode (string, array, or buffer).
 * @param {string|Function} [encodingOrMapFn] - Optional encoding (e.g., 'utf8') or mapping function for F05.from.
 * @returns {string} The Base64URL-encoded string representation of the input data.
 */
function encodeToBase64Url(inputData, encodingOrMapFn) {
  // Convert input data to a Buffer using F05.from
  const buffer = F05.from(inputData, encodingOrMapFn);

  // Encode the buffer to a base64 string
  const base64String = buffer.toString("base64");

  // Convert base64 to base64url by:
  // 1. Removing '=' padding
  // 2. Replacing '+' with '-'
  // 3. Replacing '/' with '_'
  const base64UrlString = base64String
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return base64UrlString;
}

module.exports = encodeToBase64Url;