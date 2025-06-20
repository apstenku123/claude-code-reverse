/**
 * Creates a throttled version of the provided function, with support for leading/trailing edge invocation,
 * optional maximum wait time, and cancellation/flush controls. Useful for rate-limiting function calls
 * (e.g., in event handlers or API requests).
 *
 * @param {Function} targetFunction - The function to be throttled.
 * @param {number} [wait=0] - The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel throttling.
 * @param {boolean} [options.leading=false] - Whether to invoke on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - Whether to invoke on the trailing edge of the timeout.
 * @param {number} [options.maxWait] - Maximum time (ms) to wait before forcing an invocation.
 * @returns {Function} The throttled function, with .cancel() and .flush() methods.
 */
function C(targetFunction, wait = 0, options = {}) {
  // Ensure options is always an object
  if (typeof options !== "object" || options === null) options = {};

  // Destructure options with defaults
  const {
    signal: abortSignal,
    leading: invokeOnLeadingEdge = false,
    trailing: invokeOnTrailingEdge = true,
    maxWait
  } = options;

  // Determine which edges to trigger on
  const edgeTypes = Array(2);
  if (invokeOnLeadingEdge) edgeTypes[0] = "leading";
  if (invokeOnTrailingEdge) edgeTypes[1] = "trailing";

  let lastResult = undefined; // Stores the last result of targetFunction
  let lastInvokeTime = null;  // Timestamp of the last invocation (for maxWait)

  // Create the throttled function using the provided throttleFunction utility
  const throttled = throttleFunction(function (...args) {
    lastResult = targetFunction.apply(this, args);
    lastInvokeTime = null;
  }, wait, {
    signal: abortSignal,
    edges: edgeTypes
  });

  /**
   * The wrapped function that applies throttling and maxWait logic.
   * @returns {*} The last result of the target function.
   */
  const throttledWrapper = function (...args) {
    // If maxWait is set, ensure the function is invoked at least every maxWait ms
    if (maxWait != null) {
      const now = Date.now();
      if (lastInvokeTime === null) {
        lastInvokeTime = now;
      } else if (now - lastInvokeTime >= maxWait) {
        // Force invocation if maxWait exceeded
        lastResult = targetFunction.apply(this, args);
        lastInvokeTime = now;
        throttled.cancel();
        throttled.schedule();
        return lastResult;
      }
    }
    // Otherwise, use the throttled function
    throttled.apply(this, args);
    return lastResult;
  };

  /**
   * Flushes any pending invocations and returns the last result.
   * @returns {*} The last result of the target function.
   */
  throttledWrapper.flush = function () {
    throttled.flush();
    return lastResult;
  };

  // Expose the cancel method
  throttledWrapper.cancel = throttled.cancel;

  return throttledWrapper;
}

module.exports = C;