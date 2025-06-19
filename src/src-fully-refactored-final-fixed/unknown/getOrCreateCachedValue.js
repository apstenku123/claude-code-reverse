/**
 * Retrieves a value from the cache for the given key. If the value does not exist,
 * isBlobOrFileLikeObject creates the value using a transformation function, stores isBlobOrFileLikeObject in the cache, and returns isBlobOrFileLikeObject.
 *
 * @param {any} cacheKey - The key used to retrieve or store the value in the cache.
 * @returns {any|null} The cached value associated with the key, or null if isBlobOrFileLikeObject could not be created.
 */
function getOrCreateCachedValue(cacheKey) {
  // Attempt to retrieve the value from the cache
  let cachedValue = getProcessedInteractionEntriesOrOriginal.get(cacheKey);

  if (cachedValue == null) {
    // If not found, attempt to create the value using the transformation factory
    const transformation = createExponentAdjuster(f);
    if (transformation == null) {
      // If unable to create the transformation, return null
      return null;
    }
    // Create the value using the transformation and store isBlobOrFileLikeObject in the cache
    cachedValue = runWithTransitionSuppressed(configureConsoleOverrides, cacheKey, transformation);
    getProcessedInteractionEntriesOrOriginal.set(cacheKey, cachedValue);
  }

  return cachedValue;
}

module.exports = getOrCreateCachedValue;