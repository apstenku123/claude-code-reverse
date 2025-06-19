/**
 * Converts a standard Base64-encoded string to a Base64URL-encoded string.
 * Base64URL is a URL-safe variant of Base64 encoding, commonly used in JWTs and web tokens.
 * It replaces '+' with '-', '/' with '_', and removes any '=' padding characters.
 *
 * @param {string} base64String - The Base64-encoded string to convert.
 * @returns {string} The Base64URL-encoded string.
 */
function base64ToBase64Url(base64String) {
  // Remove all '=' padding characters
  // Replace '+' with '-' and '/' with '_' for URL safety
  return base64String
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

module.exports = base64ToBase64Url;