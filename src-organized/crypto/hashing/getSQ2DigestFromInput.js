/**
 * Generates a digest from the provided input using the SQ2 hashing algorithm.
 *
 * @param {any} inputData - The data to be hashed by the SQ2 algorithm.
 * @returns {any} The resulting digest from the SQ2 hash computation.
 */
function getSQ2DigestFromInput(inputData) {
  // Create a new instance of the SQ2 hashing algorithm
  const sq2Hasher = new SQ2();

  // Update the hasher with the provided input data
  sq2Hasher.update(inputData);

  // Compute and return the digest
  return sq2Hasher.digest();
}

module.exports = getSQ2DigestFromInput;