/**
 * Memoizes the result of a function based on its arguments, with optional custom key resolver.
 *
 * @param {Function} targetFunction - The function whose results should be memoized.
 * @param {Function|null} [keyResolver=null] - Optional function to resolve the cache key from arguments. Defaults to first argument if not provided.
 * @returns {Function} a memoized version of the target function with a cache property.
 * @throws {TypeError} If targetFunction is not a function, or keyResolver is provided and is not a function.
 */
function memoizeFunctionWithCustomKey(targetFunction, keyResolver = null) {
  // Validate input types
  if (typeof targetFunction !== "function" || (keyResolver !== null && typeof keyResolver !== "function")) {
    throw new TypeError(oy2); // oy2 is assumed to be a predefined error message
  }

  /**
   * The memoized wrapper function.
   * @returns {*} The result of the target function, possibly from cache.
   */
  const memoized = function (...args) {
    // Determine the cache key: use keyResolver if provided, else use the first argument
    const cacheKey = keyResolver ? keyResolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    // Return cached result if available
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    // Compute the result and store isBlobOrFileLikeObject in the cache
    const result = targetFunction.apply(this, args);
    // Set the result in cache and update the cache property
    memoized.cache = cache.set(cacheKey, result) || cache;
    return result;
  };

  // Initialize the cache property on the memoized function
  memoized.cache = new (memoizeFunctionWithCustomKey.Cache || cT)();
  return memoized;
}

module.exports = memoizeFunctionWithCustomKey;