/**
 * Generates a session-specific storage key for Statsig using the provided identifier.
 *
 * @param {string} identifier - The unique identifier used to generate the storage key (e.g., user updateSnapshotAndNotify, session token).
 * @returns {string} The fully qualified Statsig session storage key.
 */
function getSessionStorageKey(identifier) {
  // Use Xw9._getStorageKey to generate a unique key segment from the identifier
  const storageKeySegment = Xw9._getStorageKey(identifier);
  // Prefix the key segment with 'statsig.session_id.' to form the full storage key
  return `statsig.session_id.${storageKeySegment}`;
}

module.exports = getSessionStorageKey;