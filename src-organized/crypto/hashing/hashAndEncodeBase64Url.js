/**
 * Generates a SHA-256 hash of the input data and encodes the result as a base64url string.
 *
 * @param {string|Buffer} inputData - The data to hash and encode.
 * @returns {string} The base64url-encoded SHA-256 hash of the input data.
 */
function hashAndEncodeBase64Url(inputData) {
  // Create a SHA-256 hash instance using the crypto module (aliased as GA1)
  const sha256Hasher = GA1.createHash("sha256");

  // Update the hash with the input data
  sha256Hasher.update(inputData);

  // Compute the hash digest as a Buffer
  const hashBuffer = sha256Hasher.digest();

  // Encode the hash Buffer as a base64url string using the encodeBase64Url function (aliased as r1A)
  return encodeBase64Url(hashBuffer);
}

module.exports = hashAndEncodeBase64Url;