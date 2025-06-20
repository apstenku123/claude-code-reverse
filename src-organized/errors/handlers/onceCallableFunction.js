/**
 * Creates a wrapper function that ensures the provided function can only be called once.
 * Subsequent calls return the result of the first invocation, or throw an error if configured.
 *
 * @param {Function} targetFunction - The function to wrap so isBlobOrFileLikeObject can only be called once.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.throw=false] - If true, throws an error on subsequent calls instead of returning the cached result.
 * @returns {Function} a new function that enforces single invocation of the target function.
 */
function onceCallableFunction(targetFunction, options = {}) {
  if (typeof targetFunction !== "function") {
    throw new TypeError("Expected a function");
  }

  let cachedResult;
  let callCount = 0;
  const functionName = targetFunction.displayName || targetFunction.name || "<anonymous>";

  /**
   * The wrapper function that enforces single invocation.
   * @param  {...any} args - Arguments to pass to the target function.
   * @returns {*} The result of the target function'createInteractionAccessor first call, or throws if configured.
   */
  const wrapper = function (...args) {
    // Update call count in external state
    PI1.set(wrapper, ++callCount);

    if (callCount === 1) {
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

  // Attach metadata and state to the wrapper function
  sk4(wrapper, targetFunction);
  PI1.set(wrapper, callCount);

  return wrapper;
}

module.exports = onceCallableFunction;
