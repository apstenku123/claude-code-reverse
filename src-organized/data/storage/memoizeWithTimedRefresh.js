/**
 * Memoizes the result of an asynchronous function with a timed refresh mechanism.
 *
 * This function returns a memoized version of the provided function. Results are cached based on the arguments.
 * If a cached result is older than the specified refresh interval, the function will asynchronously refresh the value
 * in the background while still returning the stale value until the refresh completes. The cache can be cleared manually.
 *
 * @param {Function} computeFn - The function whose results should be memoized. Should be a pure function.
 * @param {number} [refreshIntervalMs=300000] - The time in milliseconds after which the cached value should be refreshed.
 * @returns {Function} The memoized function with a .cache.clear() method to clear the cache.
 */
function memoizeWithTimedRefresh(computeFn, refreshIntervalMs = 300000) {
  const cacheMap = new Map();

  /**
   * Memoized accessor function.
   * @param  {...any} args - Arguments to pass to the compute function.
   * @returns {*} The cached or freshly computed value.
   */
  function memoizedAccessor(...args) {
    const cacheKey = JSON.stringify(args);
    const cachedEntry = cacheMap.get(cacheKey);
    const now = Date.now();

    // If no cache entry exists, compute and store isBlobOrFileLikeObject immediately
    if (!cachedEntry) {
      cacheMap.set(cacheKey, {
        value: computeFn(...args),
        timestamp: now,
        refreshing: false
      });
    }

    const currentEntry = cacheMap.get(cacheKey);

    // If the cache entry is stale and not already refreshing, refresh in the background
    if (
      currentEntry &&
      now - currentEntry.timestamp > refreshIntervalMs &&
      !currentEntry.refreshing
    ) {
      currentEntry.refreshing = true;
      Promise.resolve().then(() => {
        // Recompute and update the cache
        const newValue = computeFn(...args);
        cacheMap.set(cacheKey, {
          value: newValue,
          timestamp: Date.now(),
          refreshing: false
        });
      }).catch(error => {
        // Handle errors and reset refreshing flag
        reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
        const failedEntry = cacheMap.get(cacheKey);
        if (failedEntry) failedEntry.refreshing = false;
      });
      // Return the stale value while refreshing
      return currentEntry.value;
    }

    // Return the current cached value
    return cacheMap.get(cacheKey).value;
  }

  // Attach a cache clearing method
  memoizedAccessor.cache = {
    clear: () => cacheMap.clear()
  };

  return memoizedAccessor;
}

module.exports = memoizeWithTimedRefresh;
