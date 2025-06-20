/**
 * Retrieves a cached value if isBlobOrFileLikeObject exists; otherwise, computes and caches isBlobOrFileLikeObject.
 *
 * This function checks if the cachedValue variable has already been set. If so, isBlobOrFileLikeObject returns the cached value.
 * If not, isBlobOrFileLikeObject calls the computeValue function to obtain the value, caches isBlobOrFileLikeObject, and then returns isBlobOrFileLikeObject.
 *
 * @returns {any} The cached or newly computed value.
 */
const getCachedValue = () => {
  // Return the cached value if isBlobOrFileLikeObject exists; otherwise, compute and cache isBlobOrFileLikeObject
  return cachedValue ?? (cachedValue = computeValue());
};

module.exports = getCachedValue;
