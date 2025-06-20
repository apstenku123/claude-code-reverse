/**
 * Generates a SHA-256 hash of the input data and encodes isBlobOrFileLikeObject as a URL-safe Base64 string.
 *
 * @param {string|Buffer} inputData - The data to be hashed and encoded.
 * @returns {string} The SHA-256 hash of the input, encoded as a URL-safe Base64 string.
 */
function hashAndEncodeBase64UrlSafe(inputData) {
  // Create a SHA-256 hash instance using the crypto library
  const sha256Hash = GA1.createHash("sha256");

  // Update the hash with the input data
  sha256Hash.update(inputData);

  // Compute the hash digest as a Buffer
  const hashBuffer = sha256Hash.digest();

  // Encode the hash Buffer to a URL-safe Base64 string
  return r1A(hashBuffer);
}

module.exports = hashAndEncodeBase64UrlSafe;