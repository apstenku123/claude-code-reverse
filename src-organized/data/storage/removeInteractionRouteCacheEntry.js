/**
 * Removes a cached interaction route entry based on the provided source observable and configuration.
 *
 * @param {string} sourceObservable - The identifier for the source observable or route mapping.
 * @param {object} config - The configuration object used to generate the cache key.
 * @returns {void}
 *
 * This function generates a unique cache key using the source observable and configuration,
 * then removes the corresponding entry from the QJ1.cache.
 */
function removeInteractionRouteCacheEntry(sourceObservable, config) {
  // Generate a unique cache key for the interaction route
  const cacheKey = formatInteractionRouteMapping(sourceObservable, config);
  // Remove the cache entry associated with the generated key
  QJ1.cache.delete(cacheKey);
}

module.exports = removeInteractionRouteCacheEntry;