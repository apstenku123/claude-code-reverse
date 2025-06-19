/**
 * Generates a network fallback key for Statsig using the provided source identifier.
 * The key is constructed by prefixing 'statsig.network_fallback.' to the DJB2 hash of the source identifier.
 *
 * @param {string} sourceIdentifier - The identifier to be hashed and used in the fallback key.
 * @returns {string} The generated network fallback key.
 */
function getNetworkFallbackKey(sourceIdentifier) {
  // Compute the DJB2 hash of the source identifier using the external Yw9._DJB2 function
  const hashedIdentifier = Yw9._DJB2(sourceIdentifier);
  // Construct and return the fallback key string
  return `statsig.network_fallback.${hashedIdentifier}`;
}

module.exports = getNetworkFallbackKey;