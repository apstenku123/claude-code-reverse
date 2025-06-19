/**
 * Generates a cryptographically secure random token encoded as a URL-safe Base64 (Base64URL) string.
 *
 * This function creates 32 random bytes using the cryptographic random byte generator,
 * then encodes the result into a URL-safe Base64 string (Base64URL) by replacing unsafe characters and removing padding.
 *
 * @returns {string} a 32-byte cryptographically secure random token, Base64URL encoded.
 */
function generateRandomBase64UrlSafeToken() {
  // Generate 32 cryptographically secure random bytes
  const randomBytesBuffer = GA1.randomBytes(32);

  // Encode the random bytes as a URL-safe Base64 string (Base64URL)
  const base64UrlSafeToken = encodeBase64UrlSafe(randomBytesBuffer);

  return base64UrlSafeToken;
}

module.exports = generateRandomBase64UrlSafeToken;