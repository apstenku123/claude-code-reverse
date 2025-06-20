/**
 * Generates a cryptographically secure random 32-byte string encoded in URL-safe Base64 format (Base64URL).
 *
 * This function uses the GA1.randomBytes method to generate 32 random bytes,
 * then encodes the result using encodeBase64UrlSafe to produce a URL-safe string.
 *
 * @returns {string} a 32-byte cryptographically secure random string, Base64URL encoded.
 */
function generateRandomBase64UrlSafeString() {
  // Generate 32 cryptographically secure random bytes
  const randomBytes = GA1.randomBytes(32);

  // Encode the random bytes to a URL-safe Base64 string (Base64URL)
  const base64UrlSafeString = encodeBase64UrlSafe(randomBytes);

  return base64UrlSafeString;
}

module.exports = generateRandomBase64UrlSafeString;