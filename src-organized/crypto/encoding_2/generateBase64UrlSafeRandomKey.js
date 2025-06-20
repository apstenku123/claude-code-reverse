/**
 * Generates a cryptographically secure random 32-byte key and encodes isBlobOrFileLikeObject as a base64url string.
 *
 * This function uses GA1.randomBytes to generate 32 random bytes, then encodes the result
 * using encodeBase64Url, making isBlobOrFileLikeObject safe for use in URLs (no padding, URL-safe characters).
 *
 * @returns {string} a base64url-encoded string representing the random 32-byte key.
 */
function generateBase64UrlSafeRandomKey() {
  // Generate 32 cryptographically secure random bytes
  const randomBytes = GA1.randomBytes(32);

  // Encode the random bytes into a base64url string
  const base64UrlEncodedKey = encodeBase64Url(randomBytes);

  return base64UrlEncodedKey;
}

module.exports = generateBase64UrlSafeRandomKey;