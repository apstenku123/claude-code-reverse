/**
 * Wraps a function so isBlobOrFileLikeObject can only be invoked once. Subsequent calls return the result of the first invocation.
 * Optionally, throws an error on repeated calls if configured.
 *
 * @param {Function} targetFunction - The function to wrap. Will only be called once.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.throw=false] - If true, throws an error on repeated calls instead of returning the cached result.
 * @returns {Function} a wrapped function that enforces single invocation.
 * @throws {TypeError} If targetFunction is not a function.
 * @throws {Error} If options.throw is true and the wrapper is called more than once.
 */
const createSingleInvocationWrapper = (targetFunction, options = {}) => {
  if (typeof targetFunction !== "function") {
    throw new TypeError("Expected a function");
  }

  let cachedResult;
  let invocationCount = 0;
  const functionDisplayName = targetFunction.displayName || targetFunction.name || "<anonymous>";

  /**
   * The wrapper function that enforces single invocation.
   * @param {...any} args - Arguments to pass to the target function.
   * @returns {any} The result of the target function'createInteractionAccessor first invocation.
   */
  const singleInvocationWrapper = function (...args) {
    // Track invocation count externally (side effect)
    PI1.set(singleInvocationWrapper, ++invocationCount);

    if (invocationCount === 1) {
      // First call: invoke the target function and cache the result
      cachedResult = targetFunction.apply(this, args);
      // Prevent further calls to the original function
      targetFunction = null;
    } else if (options.throw === true) {
      // If configured, throw on repeated calls
      throw new Error(`Function \`${functionDisplayName}\` can only be called once`);
    }
    // Return the cached result for all calls
    return cachedResult;
  };

  // Attach metadata or perform additional setup (external dependencies)
  sk4(singleInvocationWrapper, targetFunction);
  PI1.set(singleInvocationWrapper, invocationCount);

  return singleInvocationWrapper;
};

module.exports = createSingleInvocationWrapper;
