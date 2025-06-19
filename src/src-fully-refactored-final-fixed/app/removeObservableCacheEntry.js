/**
 * Removes a cached observable entry based on the provided source observable and configuration.
 *
 * @param {string} sourceObservable - Identifier for the source observable.
 * @param {object} config - Configuration object for the observable.
 * @returns {void}
 *
 * This function generates a unique cache key using the source observable and its configuration,
 * then removes the corresponding entry from the QJ1 observable cache.
 */
function removeObservableCacheEntry(sourceObservable, config) {
  // Generate a unique cache key for the observable/config pair
  const cacheKey = createObservableConfigKey(sourceObservable, config);
  // Remove the cached observable entry from QJ1'createInteractionAccessor cache
  QJ1.cache.delete(cacheKey);
}

module.exports = removeObservableCacheEntry;