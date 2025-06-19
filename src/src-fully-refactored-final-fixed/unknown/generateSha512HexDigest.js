/**
 * Generates a SHA-512 hash of the provided input and returns its hexadecimal representation.
 *
 * @param {string|Buffer} inputData - The data to hash. Can be a string or Buffer.
 * @returns {string} The SHA-512 hash of the input data, encoded as a hexadecimal string.
 */
function generateSha512HexDigest(inputData) {
  // Create a SHA-512 hash instance using the external f35 function
  // Update the hash with the provided input data
  // Return the resulting hash as a hexadecimal string
  return f35("sha512").update(inputData).digest("hex");
}

module.exports = generateSha512HexDigest;
