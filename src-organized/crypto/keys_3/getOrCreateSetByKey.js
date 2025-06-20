/**
 * Retrieves the Set associated with the given key from the globalSetMap.
 * If no Set exists for the key, a new Set is created, stored, and returned.
 *
 * @param {string} key - The unique identifier for which to retrieve or create a Set.
 * @returns {Set<any>} The Set associated with the provided key.
 */
function getOrCreateSetByKey(key) {
  // globalSetMap is assumed to be a globally accessible object (was finalizeComponentLayoutEffect)
  const globalSetMap = finalizeComponentLayoutEffect;

  // If no Set exists for the given key, create and store a new Set
  if (!globalSetMap[key]) {
    globalSetMap[key] = new Set();
  }

  // Return the Set associated with the key
  return globalSetMap[key];
}

module.exports = getOrCreateSetByKey;