/**
 * Generates a SHA-256 hash of the input data and transforms the result using r1A.
 *
 * @param {string|Buffer} inputData - The data to be hashed (as a string or Buffer).
 * @returns {any} The transformed hash result from r1A.
 */
function hashAndTransformData(inputData) {
  // Create a SHA-256 hash instance using the provided GA1 module
  const sha256Hasher = GA1.createHash("sha256");

  // Update the hash with the input data
  sha256Hasher.update(inputData);

  // Finalize the hash and transform the result using r1A
  const hashDigest = sha256Hasher.digest();
  return r1A(hashDigest);
}

module.exports = hashAndTransformData;