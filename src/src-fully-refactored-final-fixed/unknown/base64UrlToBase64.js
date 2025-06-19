/**
 * Converts a Base64URL-encoded string to a standard Base64-encoded string.
 *
 * Base64URL encoding is similar to Base64 but uses '-' instead of '+',
 * '_' instead of '/', and omits padding '='. This function restores padding
 * and replaces URL-safe characters with their Base64 equivalents.
 *
 * @param {string} base64UrlString - The Base64URL-encoded string to convert.
 * @returns {string} The standard Base64-encoded string.
 */
function base64UrlToBase64(base64UrlString) {
  // Ensure input is a string
  const stringInput = base64UrlString.toString();

  // Calculate the number of padding characters needed (Base64 strings must be a multiple of 4)
  const paddingNeeded = 4 - (stringInput.length % 4);
  let paddedString = stringInput;

  // If padding is needed (i.e., not already a multiple of 4), add '=' characters
  if (paddingNeeded !== 4) {
    paddedString += '='.repeat(paddingNeeded);
  }

  // Replace URL-safe Base64 characters with standard Base64 characters
  const base64String = paddedString.replace(/\-/g, '+').replace(/_/g, '/');

  return base64String;
}

module.exports = base64UrlToBase64;
