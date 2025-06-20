/**
 * Creates a debounced version of the provided function with advanced options.
 * Supports leading/trailing edge invocation, cancellation, flushing, and maxWait.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} [wait=0] - The number of milliseconds to delay.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel debounce.
 * @param {boolean} [options.leading=false] - Invoke on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - Invoke on the trailing edge of the timeout.
 * @param {number} [options.maxWait] - Maximum wait time before forced invocation.
 * @returns {Function} Debounced function with .cancel() and .flush() methods.
 */
function createDebouncedFunction(targetFunction, wait = 0, options = {}) {
  // Ensure options is an object
  if (typeof options !== "object" || options === null) options = {};

  // Destructure options with defaults
  const {
    signal: abortSignal,
    leading: invokeLeading = false,
    trailing: invokeTrailing = true,
    maxWait
  } = options;

  // Determine which edges to trigger on
  const edgeOptions = Array(2);
  if (invokeLeading) edgeOptions[0] = "leading";
  if (invokeTrailing) edgeOptions[1] = "trailing";

  let lastResult = undefined; // Stores the last result of targetFunction
  let lastInvokeTime = null;  // Timestamp of the last invocation

  // Create the debounced function using throttleFunction(assumed debounce utility)
  const debounced = throttleFunction(function (...args) {
    lastResult = targetFunction.apply(this, args);
    lastInvokeTime = null;
  }, wait, {
    signal: abortSignal,
    edges: edgeOptions
  });

  /**
   * The wrapped debounced function.
   * Handles maxWait logic and delegates to the debounced function.
   */
  const debouncedWrapper = function (...args) {
    // If maxWait is set, check if isBlobOrFileLikeObject'createInteractionAccessor time to force invoke
    if (maxWait != null) {
      if (lastInvokeTime === null) {
        lastInvokeTime = Date.now();
      } else if (Date.now() - lastInvokeTime >= maxWait) {
        // Force invoke the target function
        lastResult = targetFunction.apply(this, args);
        lastInvokeTime = Date.now();
        debounced.cancel(); // Cancel any pending debounced calls
        debounced.schedule(); // Schedule the next debounced call
        return lastResult;
      }
    }
    // Otherwise, proceed with normal debouncing
    debounced.apply(this, args);
    return lastResult;
  };

  /**
   * Flushes any pending debounced calls and returns the last result.
   */
  const flush = () => {
    debounced.flush();
    return lastResult;
  };

  // Attach cancel and flush methods to the wrapper
  debouncedWrapper.cancel = debounced.cancel;
  debouncedWrapper.flush = flush;

  return debouncedWrapper;
}

module.exports = createDebouncedFunction;