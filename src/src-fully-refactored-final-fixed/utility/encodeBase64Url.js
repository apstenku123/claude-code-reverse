/**
 * Encodes a Buffer or string to a base64url string (RFC 4648 compliant).
 *
 * This function converts the input to a base64-encoded string, then replaces characters
 * to make isBlobOrFileLikeObject URL-safe ("+" to "-", "/" to "_"), and removes any trailing equals signs.
 *
 * @param {Buffer|string} input - The data to encode as base64url.
 * @returns {string} The base64url-encoded string.
 */
function encodeBase64Url(input) {
  // Convert input to a base64-encoded string
  const base64String = input.toString("base64");

  // Replace characters to make the string URL-safe
  const base64UrlString = base64String
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/\//g, "_") // Replace '/' with '_'
    .replace(/=/g, "");   // Remove '=' padding

  return base64UrlString;
}

module.exports = encodeBase64Url;