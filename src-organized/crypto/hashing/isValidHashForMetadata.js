/**
 * Checks if the provided source data matches any of the expected hashes defined in the metadata.
 *
 * @param {string} sourceData - The data to be hashed and compared.
 * @param {object} metadataConfig - The configuration object containing metadata information.
 * @returns {boolean} True if the hash of the source data matches any expected hash, or if no metadata is available; otherwise, false.
 */
function isValidHashForMetadata(sourceData, metadataConfig) {
  // If the hash library is not available, assume valid
  if (typeof lD1 === 'undefined') return true;

  // Extract metadata subscription from config
  const metadataSubscription = extractValidAlgorithmMetadata(metadataConfig);

  // If no metadata is present, assume valid
  if (metadataSubscription === "no metadata") return true;
  if (metadataSubscription.length === 0) return true;

  // Extract hash algorithms and expected hashes from metadata
  const hashAlgorithms = selectPreferredHashAlgorithm(metadataSubscription);
  const hashEntries = filterEntriesByAlgorithm(metadataSubscription, hashAlgorithms);

  // Iterate over each hash entry and compare
  for (const hashEntry of hashEntries) {
    const { algo: algorithm, hash: expectedHash } = hashEntry;

    // Compute the hash of the source data using the specified algorithm
    let computedHash = lD1.createHash(algorithm)
      .update(sourceData)
      .digest("base64");

    // Remove trailing '=' padding characters for comparison
    if (computedHash[computedHash.length - 1] === "=") {
      if (computedHash[computedHash.length - 2] === "=") {
        computedHash = computedHash.slice(0, -2);
      } else {
        computedHash = computedHash.slice(0, -1);
      }
    }

    // Compare the computed hash with the expected hash
    if (areStringsEquivalentWithSpecialCases(computedHash, expectedHash)) {
      return true;
    }
  }

  // No matching hash found
  return false;
}

module.exports = isValidHashForMetadata;