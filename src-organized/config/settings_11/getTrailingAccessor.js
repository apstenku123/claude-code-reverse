/**
 * Creates a debounced accessor function that invokes the provided callback with configurable leading/trailing edge execution and optional maximum wait time.
 *
 * @param {Function} callback - The function to be debounced and invoked.
 * @param {number} [wait=0] - The debounce delay in milliseconds.
 * @param {Object} [options={}] - Configuration options.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the debounced function.
 * @param {boolean} [options.leading=false] - Whether to invoke on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - Whether to invoke on the trailing edge of the timeout.
 * @param {number} [options.maxWait] - Maximum time in milliseconds to wait before forcing invocation.
 * @returns {Function} Debounced accessor function with .cancel and .flush methods.
 */
function getTrailingAccessor(callback, wait = 0, options = {}) {
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

  let lastResult = undefined; // Stores the last result returned by callback
  let lastInvokeTime = null;  // Tracks the last time callback was invoked

  // Create the debounced function using the provided debounce utility
  const debounced = debounceFunction(function (...args) {
    lastResult = callback.apply(this, args);
    lastInvokeTime = null;
  }, wait, {
    signal: abortSignal,
    edges: edgeTypes
  });

  /**
   * The accessor function that manages debouncing and maxWait logic.
   * If maxWait is specified, ensures callback is invoked at least every maxWait ms.
   */
  const accessor = function (...args) {
    if (maxWait != null) {
      const now = Date.now();
      if (lastInvokeTime === null) {
        lastInvokeTime = now;
      } else if (now - lastInvokeTime >= maxWait) {
        // If maxWait exceeded, force immediate invocation
        lastResult = callback.apply(this, args);
        lastInvokeTime = now;
        debounced.cancel(); // Cancel any pending debounced calls
        debounced.schedule(); // Schedule next debounce
        return lastResult;
      }
    }
    debounced.apply(this, args);
    return lastResult;
  };

  /**
   * Flushes any pending debounced calls and returns the last result.
   * @returns {*} The last result returned by the callback.
   */
  const flush = () => {
    debounced.flush();
    return lastResult;
  };

  // Attach cancel and flush methods to the accessor
  accessor.cancel = debounced.cancel;
  accessor.flush = flush;

  return accessor;
}

module.exports = getTrailingAccessor;