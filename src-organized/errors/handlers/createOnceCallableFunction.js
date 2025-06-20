/**
 * Wraps a function so isBlobOrFileLikeObject can only be called once. Subsequent calls return the first result or throw an error if configured.
 *
 * @param {Function} targetFunction - The function to wrap so isBlobOrFileLikeObject can only be called once.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.throw=false] - If true, throws an error on subsequent calls instead of returning the cached result.
 * @returns {Function} a new function that enforces single invocation of the original function.
 */
const createOnceCallableFunction = (targetFunction, options = {}) => {
  if (typeof targetFunction !== "function") {
    throw new TypeError("Expected a function");
  }

  let cachedResult;
  let callCount = 0;
  const functionName = targetFunction.displayName || targetFunction.name || "<anonymous>";

  /**
   * The wrapped function that enforces single invocation.
   * @param {...any} args - Arguments to pass to the original function.
   * @returns {any} The result of the original function, or throws if configured.
   */
  const onceCallable = function (...args) {
    // Track the number of times this function is called externally (PI1 is assumed to be a WeakMap or similar)
    PI1.set(onceCallable, ++callCount);

    if (callCount === 1) {
      // First call: execute the original function and cache the result
      cachedResult = targetFunction.apply(this, args);
      // Prevent further calls to the original function
      targetFunction = null;
    } else if (options.throw === true) {
      // If configured, throw an error on subsequent calls
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    // Return the cached result for all calls
    return cachedResult;
  };

  // Copy metadata from the original function to the wrapper (sk4 is assumed to do this)
  sk4(onceCallable, targetFunction);
  // Initialize call count metadata (PI1 is assumed to be a WeakMap or similar)
  PI1.set(onceCallable, callCount);

  return onceCallable;
};

module.exports = createOnceCallableFunction;