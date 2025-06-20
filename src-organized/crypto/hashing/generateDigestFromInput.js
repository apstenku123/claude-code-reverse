/**
 * Generates a digest (hash) from the provided input using the d62 hashing algorithm.
 *
 * @param {string} inputData - The input data to be hashed.
 * @returns {string} The resulting digest as a string.
 */
function generateDigestFromInput(inputData) {
  // Create a new instance of the d62 hashing algorithm
  const hasher = new d62();
  // Update the hasher with the input data
  hasher.update(inputData);
  // Compute and return the digest
  return hasher.digest();
}

module.exports = generateDigestFromInput;