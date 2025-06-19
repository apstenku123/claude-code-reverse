/**
 * Converts a standard Base64-encoded string to a Base64URL-encoded string.
 * Base64URL encoding replaces '+' with '-', '/' with '_', and removes '=' padding characters.
 *
 * @param {string} base64String - The standard Base64-encoded string to convert.
 * @returns {string} The Base64URL-encoded string.
 */
function base64UrlEncode(base64String) {
  // Remove all '=' padding characters
  // Replace '+' with '-' and '/' with '_' to make the string URL-safe
  return base64String
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

module.exports = base64UrlEncode;