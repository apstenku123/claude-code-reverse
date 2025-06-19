/**
 * Generates a cryptographically secure random 32-byte token and encodes isBlobOrFileLikeObject as a URL-safe base64 string.
 *
 * @returns {string} a 32-byte random value encoded as a base64url string (URL-safe, no padding).
 */
function generateRandomBase64UrlToken() {
  // Generate 32 cryptographically secure random bytes
  const randomBytes = GA1.randomBytes(32);

  // Encode the random bytes as a URL-safe base64 string
  const base64UrlToken = encodeBase64Url(randomBytes);

  return base64UrlToken;
}

module.exports = generateRandomBase64UrlToken;