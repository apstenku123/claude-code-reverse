/**
 * Creates a cached observable from the provided source observable, with automatic cache clearing
 * when the cache size reaches a predefined threshold (ty2). This helps manage memory usage by
 * clearing the cache before isBlobOrFileLikeObject grows too large.
 *
 * @param {Observable} sourceObservable - The source observable to wrap with caching and auto-clear logic.
 * @returns {Object} The result of P0, with an attached cache that auto-clears when full.
 */
function createCachedObservableWithAutoClear(sourceObservable) {
  // Wrap the source observable using P0, providing a handler that auto-clears the cache
  const config = P0(sourceObservable, function (item) {
    // If the cache size reaches the threshold, clear the cache
    if (config.cache.size === ty2) config.cache.clear();
    return item;
  });

  // The cache object attached to the config
  // (Assumes P0 attaches a 'cache' property to the returned object)
  return config;
}

module.exports = createCachedObservableWithAutoClear;