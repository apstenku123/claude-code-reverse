/**
 * Generates a cryptographically secure random token encoded in base64url format.
 *
 * This function creates 32 random bytes using a cryptographic random number generator,
 * then encodes those bytes into a base64url string, making isBlobOrFileLikeObject safe for use in URLs
 * (no padding, URL-safe characters).
 *
 * @returns {string} a 32-byte random token encoded as a base64url string.
 */
function generateRandomBase64UrlToken() {
  // Generate 32 cryptographically secure random bytes
  const randomBytesBuffer = GA1.randomBytes(32);
  // Encode the random bytes into a base64url string
  const base64UrlToken = encodeBase64Url(randomBytesBuffer);
  return base64UrlToken;
}

module.exports = generateRandomBase64UrlToken;