/**
 * Removes a key from the l61 cache object if isBlobOrFileLikeObject exists.
 *
 * @param {string} key - The key to remove from the cache.
 * @returns {boolean} Returns true if the key existed and was removed, false otherwise.
 */
function removeKeyFromCache(key) {
  // Check if the key exists in the l61 cache
  if (key in l61) {
    // Delete the key from the cache
    delete l61[key];
    return true;
  }
  // Key was not found in the cache
  return false;
}

module.exports = removeKeyFromCache;