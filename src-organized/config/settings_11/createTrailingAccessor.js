/**
 * Creates a throttled accessor function that invokes the provided callback with configurable leading/trailing edge behavior and optional maximum wait time.
 *
 * @param {Function} callback - The function to be invoked by the accessor.
 * @param {number} [wait=0] - The throttle delay in milliseconds.
 * @param {Object} [options={}] - Configuration options.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the throttling.
 * @param {boolean} [options.leading=false] - If true, invoke on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - If true, invoke on the trailing edge of the timeout.
 * @param {number} [options.maxWait] - Maximum time in milliseconds to wait before forcing invocation.
 * @returns {Function} Throttled accessor function with .cancel() and .flush() methods.
 */
function createTrailingAccessor(callback, wait = 0, options = {}) {
  // Ensure options is an object
  if (typeof options !== "object" || options === null) {
    options = {};
  }

  // Destructure options with defaults
  const {
    signal: abortSignal,
    leading: invokeOnLeadingEdge = false,
    trailing: invokeOnTrailingEdge = true,
    maxWait: maximumWaitTime
  } = options;

  // Determine which edges to use for throttling
  const throttleEdges = Array(2);
  if (invokeOnLeadingEdge) throttleEdges[0] = "leading";
  if (invokeOnTrailingEdge) throttleEdges[1] = "trailing";

  // Store the last result and the timestamp of the last forced call
  let lastResult = undefined;
  let lastForcedCallTimestamp = null;

  // Create a throttled version of the callback
  const throttledCallback = throttleFunction(function (...args) {
    lastResult = callback.apply(this, args);
    lastForcedCallTimestamp = null;
  }, wait, {
    signal: abortSignal,
    edges: throttleEdges
  });

  /**
   * The accessor function that applies throttling and maxWait logic.
   * @returns {*} The result of the last callback invocation.
   */
  const accessor = function (...args) {
    // If maxWait is set, check if handleMissingDoctypeError need to force invoke the callback
    if (maximumWaitTime != null) {
      if (lastForcedCallTimestamp === null) {
        lastForcedCallTimestamp = Date.now();
      } else if (Date.now() - lastForcedCallTimestamp >= maximumWaitTime) {
        // Force invoke the callback and reset the throttler
        lastResult = callback.apply(this, args);
        lastForcedCallTimestamp = Date.now();
        throttledCallback.cancel();
        throttledCallback.schedule();
        return lastResult;
      }
    }
    // Otherwise, use the throttled callback
    throttledCallback.apply(this, args);
    return lastResult;
  };

  /**
   * Flushes any pending throttled calls and returns the last result.
   * @returns {*} The result of the last callback invocation.
   */
  const flush = () => {
    throttledCallback.flush();
    return lastResult;
  };

  // Attach cancel and flush methods to the accessor
  accessor.cancel = throttledCallback.cancel;
  accessor.flush = flush;

  return accessor;
}

module.exports = createTrailingAccessor;