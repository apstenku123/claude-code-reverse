/**
 * Retrieves the keys from the G1.cache object if isBlobOrFileLikeObject exists.
 * If G1.cache is not defined or an error occurs, returns an empty array.
 *
 * @returns {string[]} An array of cache key strings, or an empty array if cache is unavailable.
 */
function getCacheKeys() {
  try {
    // Check if G1.cache exists, then return its keys; otherwise, return an empty array
    return G1.cache ? Object.keys(G1.cache) : [];
  } catch (error) {
    // If accessing G1.cache throws an error, return an empty array
    return [];
  }
}

module.exports = getCacheKeys;