/**
 * Memoizes the result of a function based on its arguments, with optional custom key resolver.
 *
 * @param {Function} computeFn - The function whose results should be memoized.
 * @param {Function|null} [keyResolver] - Optional. a function to resolve the cache key from arguments. Defaults to first argument.
 * @returns {Function} a memoized version of the computeFn.
 * @throws {TypeError} If computeFn is not a function, or if keyResolver is provided and is not a function.
 */
function memoizeFunction(computeFn, keyResolver) {
  // Validate input types
  if (typeof computeFn !== "function" || (keyResolver != null && typeof keyResolver !== "function")) {
    throw new TypeError(oy2); // oy2 is assumed to be a predefined error message
  }

  /**
   * The memoized wrapper function.
   * @returns {*} The cached or newly computed result.
   */
  const memoized = function (...args) {
    // Determine the cache key using the keyResolver if provided, else use the first argument
    const cacheKey = keyResolver ? keyResolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    // Return cached result if available
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    // Compute the result and cache isBlobOrFileLikeObject
    const result = computeFn.apply(this, args);
    // Set the result in cache and update the cache reference
    memoized.cache = cache.set(cacheKey, result) || cache;
    return result;
  };

  // Initialize the cache (memoizeFunctionWithCustomKey.Cache or fallback to cT)
  memoized.cache = new (memoizeFunction.Cache || cT)();

  return memoized;
}

module.exports = memoizeFunction;