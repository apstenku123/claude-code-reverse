/**
 * Validates the hash of a given source data against metadata hashes using specified algorithms.
 *
 * @param {string} sourceData - The data to be hashed and validated.
 * @param {string} metadataConfig - The configuration or metadata used for hash validation.
 * @returns {boolean} Returns true if the hash matches any metadata hash or if validation is skipped; otherwise, false.
 */
function validateHashAgainstMetadata(sourceData, metadataConfig) {
  // If the hash library is not available, skip validation
  if (typeof lD1 === 'undefined') return true;

  // Retrieve subscription metadata from the config
  const subscriptionMetadata = extractValidAlgorithmMetadata(metadataConfig);

  // If no metadata is present or metadata is empty, skip validation
  if (subscriptionMetadata === "no metadata" || subscriptionMetadata.length === 0) return true;

  // Extract the hash algorithm information from the metadata
  const hashAlgorithms = selectPreferredHashAlgorithm(subscriptionMetadata);
  // Get the list of hash algorithm and hash pairs to validate against
  const hashPairs = filterEntriesByAlgorithm(subscriptionMetadata, hashAlgorithms);

  for (const hashPair of hashPairs) {
    const { algo: algorithm, hash: expectedHash } = hashPair;
    // Create a hash of the source data using the specified algorithm
    let computedHash = lD1.createHash(algorithm).update(sourceData).digest("base64");

    // Remove trailing '=' padding characters from the base64 hash
    if (computedHash[computedHash.length - 1] === "=") {
      if (computedHash[computedHash.length - 2] === "=") {
        computedHash = computedHash.slice(0, -2);
      } else {
        computedHash = computedHash.slice(0, -1);
      }
    }

    // If the computed hash matches the expected hash, validation passes
    if (areStringsEquivalentWithSpecialCases(computedHash, expectedHash)) return true;
  }

  // If no hashes matched, validation fails
  return false;
}

module.exports = validateHashAgainstMetadata;