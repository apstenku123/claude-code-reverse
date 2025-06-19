/**
 * Clears the application'createInteractionAccessor in-memory cache.
 *
 * This function removes all entries from the application'createInteractionAccessor cache by calling the clear method
 * on the cache object. This is useful for resetting cached data, for example, during logout
 * or when a full refresh of application state is required.
 *
 * @returns {void} This function does not return a value.
 */
function clearApplicationCache() {
  // Clear all entries from the application'createInteractionAccessor cache
  IS.cache.clear();
}

module.exports = clearApplicationCache;