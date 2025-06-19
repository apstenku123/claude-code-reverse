/**
 * Generates a stable storage key for Statsig using the provided identifier.
 *
 * @param {string} identifier - The identifier to generate the storage key for.
 * @returns {string} The stable storage key in the format 'statsig.stable_id.{key}'.
 */
function getStatsigStableIdStorageKey(identifier) {
  // Use the external jz9 utility to get the storage key for the identifier
  const storageKey = jz9._getStorageKey(identifier);
  // Prefix the storage key with 'statsig.stable_id.' to form the final key
  return `statsig.stable_id.${storageKey}`;
}

module.exports = getStatsigStableIdStorageKey;