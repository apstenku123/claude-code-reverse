/**
 * Memoizes the result of an asynchronous function with automatic cache refresh after a specified duration.
 *
 * @param {Function} computeFn - The function whose results should be memoized. Accepts any arguments.
 * @param {number} [refreshIntervalMs=300000] - The cache duration in milliseconds before refreshing the value.
 * @returns {Function} a memoized version of computeFn with a .cache.clear() method to clear the cache.
 *
 * The returned function caches results based on argument values. If a cached value is older than the refresh interval,
 * isBlobOrFileLikeObject triggers a background refresh while still returning the stale value immediately. If an error occurs during refresh,
 * isBlobOrFileLikeObject logs the error and marks the cache entry as not refreshing.
 */
function memoizeWithRefresh(computeFn, refreshIntervalMs = 300000) {
  // Cache: key (serialized arguments) => { value, timestamp, refreshing }
  const cache = new Map();

  /**
   * Memoized function wrapper.
   * @param  {...any} args - Arguments to pass to computeFn.
   * @returns {*} The cached or freshly computed value.
   */
  function memoizedFunction(...args) {
    const cacheKey = JSON.stringify(args);
    const cachedEntry = cache.get(cacheKey);
    const now = Date.now();

    // If no cache entry exists, compute and store isBlobOrFileLikeObject
    if (!cachedEntry) {
      cache.set(cacheKey, {
        value: computeFn(...args),
        timestamp: now,
        refreshing: false
      });
    }

    // If cache entry exists and is stale, trigger background refresh
    const currentEntry = cache.get(cacheKey);
    if (
      currentEntry &&
      now - currentEntry.timestamp > refreshIntervalMs &&
      !currentEntry.refreshing
    ) {
      currentEntry.refreshing = true;
      // Refresh in background
      Promise.resolve().then(() => {
        const newValue = computeFn(...args);
        cache.set(cacheKey, {
          value: newValue,
          timestamp: Date.now(),
          refreshing: false
        });
      }).catch(error => {
        // Log error and reset refreshing flag
        reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
        const failedEntry = cache.get(cacheKey);
        if (failedEntry) failedEntry.refreshing = false;
      });
      // Return stale value immediately
      return currentEntry.value;
    }

    // Return cached value
    return cache.get(cacheKey).value;
  }

  // Expose cache clearing method
  memoizedFunction.cache = {
    clear: () => cache.clear()
  };

  return memoizedFunction;
}

module.exports = memoizeWithRefresh;