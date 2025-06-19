/**
 * Memoizes the result of a function, using an optional custom key resolver.
 *
 * @param {Function} computeFn - The function whose results should be memoized.
 * @param {Function|null} [keyResolver] - Optional. a function to generate cache keys from arguments. If not provided, the first argument is used as the cache key.
 * @returns {Function} a memoized version of computeFn, with a cache property for inspection.
 * @throws {TypeError} If computeFn is not a function, or if keyResolver is provided and is not a function.
 */
function memoizeWithCustomKey(computeFn, keyResolver) {
  // Validate input types
  if (typeof computeFn !== "function" || (keyResolver != null && typeof keyResolver !== "function")) {
    throw new TypeError(oy2);
  }

  /**
   * The memoized wrapper function.
   * @returns {*} The cached or newly computed result of computeFn.
   */
  const memoized = function (...args) {
    // Determine the cache key
    const cacheKey = keyResolver ? keyResolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    // Return cached result if available
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    // Compute, cache, and return the result
    const result = computeFn.apply(this, args);
    // Set the result in cache and update the cache property
    memoized.cache = cache.set(cacheKey, result) || cache;
    return result;
  };

  // Initialize cache (memoizeFunctionWithCustomKey.Cache or cT must be defined in the outer scope)
  memoized.cache = new (memoizeWithCustomKey.Cache || cT)();
  return memoized;
}

module.exports = memoizeWithCustomKey;