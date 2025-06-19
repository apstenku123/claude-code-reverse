/**
 * Retrieves a value from the global cache using the provided key.
 *
 * @param {string} cacheKey - The key used to look up the value in the cache.
 * @returns {any} The value associated with the cacheKey if found; otherwise, undefined.
 */
function getValueFromCache(cacheKey) {
  // Check if the global cache object 'Vc' exists and has a 'get' method
  return Vc ? Vc.get(cacheKey) : undefined;
}

module.exports = getValueFromCache;