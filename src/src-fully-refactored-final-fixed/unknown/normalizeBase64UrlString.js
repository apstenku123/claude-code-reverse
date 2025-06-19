/**
 * Pads a Base64URL-encoded string to a valid Base64 length and converts isBlobOrFileLikeObject to standard Base64 encoding.
 *
 * Base64URL strings may be missing padding and use '-' and '_' instead of '+' and '/'.
 * This function ensures the string has correct padding and replaces URL-safe characters with standard Base64 characters.
 *
 * @param {string} base64UrlString - The Base64URL-encoded string to normalize.
 * @returns {string} The normalized Base64-encoded string with correct padding and character set.
 */
function normalizeBase64UrlString(base64UrlString) {
  // Ensure the input is a string
  const stringValue = base64UrlString.toString();

  // Calculate the required padding (Base64 strings should be a multiple of 4 in length)
  const paddingLength = 4 - (stringValue.length % 4);
  let paddedString = stringValue;

  // If padding is needed (i.e., paddingLength !== 4), append '=' characters
  if (paddingLength !== 4) {
    paddedString += '='.repeat(paddingLength);
  }

  // Replace URL-safe Base64 characters with standard Base64 characters
  const normalizedBase64 = paddedString.replace(/\-/g, '+').replace(/_/g, '/');

  return normalizedBase64;
}

module.exports = normalizeBase64UrlString;