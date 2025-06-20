/**
 * Generates a stable storage key for Statsig using the provided identifier.
 *
 * @param {string} identifier - The unique identifier to generate the storage key for.
 * @returns {string} The stable storage key in the format 'statsig.stable_id.<storageKey>'.
 */
function getStableIdStorageKey(identifier) {
  // Obtain the storage key using the external jz9._getStorageKey method
  const storageKey = jz9._getStorageKey(identifier);
  // Construct and return the full stable storage key string
  return `statsig.stable_id.${storageKey}`;
}

module.exports = getStableIdStorageKey;