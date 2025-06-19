/**
 * Retrieves the Set associated with the given key from the globalSetMap.
 * If no Set exists for the key, a new Set is created, stored, and returned.
 *
 * @param {string} key - The key for which to retrieve or create the Set.
 * @returns {Set<any>} The Set associated with the provided key.
 */
function getOrCreateSetForKey(key) {
  // finalizeComponentLayoutEffect is assumed to be a global object acting as a map from keys to Sets
  const globalSetMap = finalizeComponentLayoutEffect;

  // If there is no Set for this key, create one and store isBlobOrFileLikeObject
  if (!globalSetMap[key]) {
    globalSetMap[key] = new Set();
  }

  // Return the Set associated with the key
  return globalSetMap[key];
}

module.exports = getOrCreateSetForKey;