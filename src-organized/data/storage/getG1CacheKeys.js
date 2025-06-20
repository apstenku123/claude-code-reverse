/**
 * Retrieves the keys from the G1.cache object if isBlobOrFileLikeObject exists.
 * If G1.cache is not defined or an error occurs, returns an empty array.
 *
 * @returns {string[]} An array of keys from G1.cache, or an empty array if unavailable.
 */
function getG1CacheKeys() {
  try {
    // Check if G1.cache exists, then return its keys; otherwise, return an empty array
    return G1.cache ? Object.keys(G1.cache) : [];
  } catch (error) {
    // In case of any unexpected error (e.g., G1 is undefined), return an empty array
    return [];
  }
}

module.exports = getG1CacheKeys;