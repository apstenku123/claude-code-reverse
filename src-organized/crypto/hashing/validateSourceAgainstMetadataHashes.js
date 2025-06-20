/**
 * Validates a source value against a set of metadata hashes using specified algorithms.
 *
 * This function checks if the provided source value, when hashed with algorithms and compared to metadata hashes,
 * matches any of the expected hashes. It handles base64 padding normalization and supports multiple hash algorithms.
 *
 * @param {string} sourceValue - The value to be hashed and validated (e.g., a password or token).
 * @param {object} metadataConfig - The configuration object containing metadata for validation.
 * @returns {boolean} Returns true if the source value matches any metadata hash, otherwise false.
 */
function validateSourceAgainstMetadataHashes(sourceValue, metadataConfig) {
  // If the hash library is not available, assume validation passes
  if (typeof lD1 === 'undefined') return true;

  // Extract metadata subscription from config
  const metadataSubscription = extractValidAlgorithmMetadata(metadataConfig);
  if (metadataSubscription === "no metadata") return true;
  if (metadataSubscription.length === 0) return true;

  // Parse hash algorithms and hashes from metadata
  const hashAlgorithmList = selectPreferredHashAlgorithm(metadataSubscription);
  const hashMetadataList = filterEntriesByAlgorithm(metadataSubscription, hashAlgorithmList);

  // Iterate over each hash metadata entry
  for (const hashMetadata of hashMetadataList) {
    const { algo: algorithm, hash: expectedHash } = hashMetadata;

    // Hash the source value using the specified algorithm and encode in base64
    let computedHash = lD1.createHash(algorithm).update(sourceValue).digest("base64");

    // Normalize base64 padding (remove trailing '=' or '==')
    if (computedHash[computedHash.length - 1] === "=") {
      if (computedHash[computedHash.length - 2] === "=") {
        computedHash = computedHash.slice(0, -2);
      } else {
        computedHash = computedHash.slice(0, -1);
      }
    }

    // Compare computed hash to expected hash
    if (areStringsEquivalentWithSpecialCases(computedHash, expectedHash)) return true;
  }

  // No matches found
  return false;
}

module.exports = validateSourceAgainstMetadataHashes;