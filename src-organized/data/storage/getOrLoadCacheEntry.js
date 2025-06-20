/**
 * Retrieves a cached entry by key, or loads isBlobOrFileLikeObject if not present or if cache should be ignored.
 *
 * @param {string} cacheKey - The key identifying the cache entry to retrieve.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.ignoreCache] - If true, forces reloading the cache entry.
 * @returns {any} The cached entry associated with the given key.
 */
function getOrLoadCacheEntry(cacheKey, options) {
  // If the cache does not have the entry, or if ignoreCache is true, reload the entry
  if (!oP1[cacheKey] || (options?.ignoreCache)) {
    oP1[cacheKey] = i34(cacheKey, "utf8");
  }
  // Return the cached (or newly loaded) entry
  return oP1[cacheKey];
}

module.exports = getOrLoadCacheEntry;
