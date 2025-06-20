/**
 * Creates a debounced version of the provided function with support for leading/trailing invocation and optional maxWait.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number} [wait=0] - The number of milliseconds to delay.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel debounce.
 * @param {boolean} [options.leading=false] - Whether to invoke on the leading edge.
 * @param {boolean} [options.trailing=true] - Whether to invoke on the trailing edge.
 * @param {number} [options.maxWait] - The maximum time (ms) to wait before forcing invocation.
 * @returns {Function} Debounced function with .cancel() and .flush() methods.
 */
function debounceWithMaxWait(callback, wait = 0, options = {}) {
  if (typeof options !== "object" || options === null) {
    options = {};
  }

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

  let lastResult = undefined; // Last result of callback
  let lastInvokeTime = null;  // Last time callback was invoked (for maxWait)

  // Create the debounced function using throttleFunction(assumed debounce utility)
  const debounced = throttleFunction(function (...args) {
    lastResult = callback.apply(this, args);
    lastInvokeTime = null;
  }, wait, {
    signal: abortSignal,
    edges: edgeTypes
  });

  /**
   * The wrapped debounced function.
   * Handles maxWait logic if specified.
   */
  const debouncedWithMaxWait = function (...args) {
    if (maxWait != null) {
      if (lastInvokeTime === null) {
        lastInvokeTime = Date.now();
      } else if (Date.now() - lastInvokeTime >= maxWait) {
        // If maxWait exceeded, force invoke callback
        lastResult = callback.apply(this, args);
        lastInvokeTime = Date.now();
        debounced.cancel();
        debounced.schedule();
        return lastResult;
      }
    }
    debounced.apply(this, args);
    return lastResult;
  };

  /**
   * Flushes any pending invocation and returns last result.
   */
  const flush = () => {
    debounced.flush();
    return lastResult;
  };

  // Attach cancel and flush methods
  debouncedWithMaxWait.cancel = debounced.cancel;
  debouncedWithMaxWait.flush = flush;

  return debouncedWithMaxWait;
}

module.exports = debounceWithMaxWait;