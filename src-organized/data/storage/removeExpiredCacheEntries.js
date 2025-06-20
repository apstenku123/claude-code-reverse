/**
 * Removes expired entries from the uH1 cache based on their timestamp.
 *
 * Iterates through all entries in the uH1 Map and deletes any entry whose
 * timestamp is older than the allowed expiration interval (IR2).
 *
 * @returns {void} This function does not return a value.
 */
function removeExpiredCacheEntries() {
  const currentTimestamp = Date.now();
  // Iterate over all [key, value] pairs in the cache
  for (const [cacheKey, cacheEntry] of uH1.entries()) {
    // If the entry'createInteractionAccessor timestamp is older than the expiration interval, remove isBlobOrFileLikeObject
    if (currentTimestamp - cacheEntry.timestamp > IR2) {
      uH1.delete(cacheKey);
    }
  }
}

module.exports = removeExpiredCacheEntries;