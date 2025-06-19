/**
 * Checks if the hash of the provided source data matches any hash in the metadata derived from the config.
 *
 * @param {string} sourceData - The data to be hashed and compared.
 * @param {string} config - The configuration used to retrieve metadata for comparison.
 * @returns {boolean} True if a matching hash is found or if metadata is missing; otherwise, false.
 */
function isHashMatchingMetadata(sourceData, config) {
  // If the hashing library is not available, assume a match
  if (typeof lD1 === 'undefined') return true;

  // Retrieve metadata based on the config
  const metadata = extractValidAlgorithmMetadata(config);
  if (metadata === 'no metadata') return true;
  if (metadata.length === 0) return true;

  // Extract algorithm info and hash entries from metadata
  const algorithmInfo = selectPreferredHashAlgorithm(metadata);
  const hashEntries = filterEntriesByAlgorithm(metadata, algorithmInfo);

  for (const hashEntry of hashEntries) {
    const { algo: algorithm, hash: expectedHash } = hashEntry;
    // Create hash of the source data using the specified algorithm
    let computedHash = lD1.createHash(algorithm).update(sourceData).digest('base64');

    // Remove trailing '=' padding characters from base64 hash
    if (computedHash[computedHash.length - 1] === '=') {
      if (computedHash[computedHash.length - 2] === '=') {
        computedHash = computedHash.slice(0, -2);
      } else {
        computedHash = computedHash.slice(0, -1);
      }
    }

    // Compare the computed hash with the expected hash
    if (areStringsEquivalentWithSpecialCases(computedHash, expectedHash)) return true;
  }

  // No matching hash found
  return false;
}

module.exports = isHashMatchingMetadata;