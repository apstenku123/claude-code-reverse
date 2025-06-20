/**
 * Retrieves a cached value associated with the given object or its alternate.
 *
 * This function checks if the provided object exists in the cache (getOrUpdateIterableHelper). If not found,
 * isBlobOrFileLikeObject checks if the object'createInteractionAccessor 'alternate' property exists in the cache. If either is found,
 * the corresponding cached value is returned. If neither is found, null is returned.
 *
 * @param {Object} targetObject - The object for which to retrieve the cached value.
 * @returns {*} The cached value associated with the object or its alternate, or null if not found.
 */
function getAlternateValueFromCache(targetObject) {
  // Check if the cache contains the target object
  if (getOrUpdateIterableHelper.has(targetObject)) {
    return getOrUpdateIterableHelper.get(targetObject);
  } else {
    const alternateObject = targetObject.alternate;
    // If the alternate exists and is in the cache, return its value
    if (alternateObject !== null && getOrUpdateIterableHelper.has(alternateObject)) {
      return getOrUpdateIterableHelper.get(alternateObject);
    }
  }
  // Return null if neither the object nor its alternate is in the cache
  return null;
}

module.exports = getAlternateValueFromCache;