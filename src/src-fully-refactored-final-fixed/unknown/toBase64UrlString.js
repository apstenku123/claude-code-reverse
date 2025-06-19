/**
 * Converts input data to a base64url-encoded string.
 *
 * This function takes input data and an optional encoding or mapping function,
 * converts the data to a Buffer using F05.from, encodes isBlobOrFileLikeObject as base64, and then
 * transforms the base64 string into base64url format by replacing certain characters
 * and removing padding.
 *
 * @param {string|Buffer|Array} inputData - The data to encode (string, Buffer, or Array).
 * @param {string|undefined} encodingOrMapFn - Optional encoding (e.g., 'utf8') or mapping function for F05.from.
 * @returns {string} The base64url-encoded string representation of the input data.
 */
function toBase64UrlString(inputData, encodingOrMapFn) {
  // Convert input data to a Buffer using F05.from
  const buffer = F05.from(inputData, encodingOrMapFn);

  // Encode the buffer to a base64 string
  const base64String = buffer.toString("base64");

  // Convert base64 to base64url by replacing characters and removing padding
  const base64UrlString = base64String
    .replace(/=/g, "")   // Remove padding characters
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/\//g, "_"); // Replace '/' with '_'

  return base64UrlString;
}

module.exports = toBase64UrlString;