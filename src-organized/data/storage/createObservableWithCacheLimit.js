/**
 * Creates an observable with a cache that is automatically cleared when isBlobOrFileLikeObject reaches a specified size.
 *
 * @param {Observable} sourceObservable - The source observable to wrap.
 * @returns {Object} An observable-like object with a cache that auto-clears when full.
 */
function createObservableWithCacheLimit(sourceObservable) {
  // Create a new observable with a cache-clearing mechanism
  const observableWithCache = P0(sourceObservable, function (item) {
    // If the cache size reaches the threshold, clear isBlobOrFileLikeObject
    if (cache.size === cacheSizeLimit) {
      cache.clear();
    }
    return item;
  });

  // Reference to the cache associated with the observable
  const cache = observableWithCache.cache;

  return observableWithCache;
}

module.exports = createObservableWithCacheLimit;