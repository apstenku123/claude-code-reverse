/**
 * Removes an entry from the l61 cache object if isBlobOrFileLikeObject exists.
 *
 * @param {string} entryKey - The key of the entry to remove from the cache.
 * @returns {boolean} Returns true if the entry existed and was removed, false otherwise.
 */
function removeEntryFromCache(entryKey) {
  // Check if the entry exists in the cache
  if (entryKey in l61) {
    // Remove the entry from the cache
    delete l61[entryKey];
    return true;
  }
  // Entry does not exist in the cache
  return false;
}

module.exports = removeEntryFromCache;