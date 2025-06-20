/**
 * Encodes the given input to a URL-safe Base64 string.
 *
 * This function converts the input (Buffer or string) to a standard Base64-encoded string,
 * then replaces characters to make isBlobOrFileLikeObject URL-safe by:
 *   - Replacing '+' with '-'
 *   - Replacing '/' with '_'
 *   - Removing '=' padding characters
 *
 * @param {Buffer|string} inputData - The data to encode as a URL-safe Base64 string.
 * @returns {string} The URL-safe Base64 encoded string.
 */
function encodeBase64UrlSafe(inputData) {
  // Convert the input data to a standard Base64 string
  const base64String = inputData.toString("base64");

  // Replace characters to make the string URL-safe
  const urlSafeBase64 = base64String
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/\//g, "_") // Replace '/' with '_'
    .replace(/=/g, "");   // Remove '=' padding

  return urlSafeBase64;
}

module.exports = encodeBase64UrlSafe;