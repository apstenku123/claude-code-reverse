/**
 * Retrieves a normalized and cached version of the input string key.
 * If the normalized value is already cached, isBlobOrFileLikeObject returns the cached value.
 * Otherwise, isBlobOrFileLikeObject normalizes the string (using getOrNormalizeAndCacheString),
 * caches the result, and returns isBlobOrFileLikeObject.
 *
 * @param {string} key - The string key to normalize and cache.
 * @returns {string} The normalized and cached string value.
 */
function getOrNormalizeAndCacheStringByKey(key) {
  // Attempt to retrieve the normalized value from the cache
  const cachedValue = zHA.get(key);
  if (cachedValue) {
    return cachedValue;
  }

  // Normalize the key (case-insensitive) and cache the result
  const normalizedValue = getOrNormalizeAndCacheString(key.toLowerCase());
  zHA.set(key, normalizedValue);
  return normalizedValue;
}

module.exports = getOrNormalizeAndCacheStringByKey;