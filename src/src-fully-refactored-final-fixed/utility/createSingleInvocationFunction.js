/**
 * Wraps a function so isBlobOrFileLikeObject can only be called once. Subsequent calls return the same result or throw an error based on configuration.
 *
 * @param {Function} targetFunction - The function to wrap. Will only be invoked once.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.throw=false] - If true, throws an error on subsequent calls instead of returning the cached result.
 * @returns {Function} a wrapped function that enforces single invocation.
 *
 * @throws {TypeError} If targetFunction is not a function.
 * @throws {Error} If options.throw is true and the function is called more than once.
 */
const createSingleInvocationFunction = (targetFunction, options = {}) => {
  if (typeof targetFunction !== "function") {
    throw new TypeError("Expected a function");
  }

  let cachedResult;
  let invocationCount = 0;
  const functionName = targetFunction.displayName || targetFunction.name || "<anonymous>";

  /**
   * The wrapped function that enforces single invocation.
   * @param {...any} args - Arguments to pass to the target function.
   * @returns {any} The result of the target function.
   */
  const singleInvocationWrapper = (...args) => {
    // Update invocation count in external PI1 map
    PI1.set(singleInvocationWrapper, ++invocationCount);

    if (invocationCount === 1) {
      // First call: invoke the target function and cache the result
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

  // Attach metadata and initial invocation count
  sk4(singleInvocationWrapper, targetFunction);
  PI1.set(singleInvocationWrapper, invocationCount);

  return singleInvocationWrapper;
};

module.exports = createSingleInvocationFunction;
