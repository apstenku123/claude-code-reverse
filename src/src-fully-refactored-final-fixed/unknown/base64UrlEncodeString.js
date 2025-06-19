/**
 * Converts a standard Base64-encoded string to a Base64URL-encoded string.
 * Base64URL encoding replaces '+' with '-', '/' with '_', and removes '=' padding.
 *
 * @param {string} base64String - The standard Base64-encoded string to convert.
 * @returns {string} The Base64URL-encoded string.
 */
function base64UrlEncodeString(base64String) {
  // Remove all '=' padding characters
  const noPadding = base64String.replace(/=/g, "");
  // Replace '+' with '-'
  const plusReplaced = noPadding.replace(/\+/g, "-");
  // Replace '/' with '_'
  const urlSafe = plusReplaced.replace(/\//g, "_");
  return urlSafe;
}

module.exports = base64UrlEncodeString;
