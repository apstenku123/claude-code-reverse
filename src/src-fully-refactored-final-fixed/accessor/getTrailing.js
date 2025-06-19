/**
 * Creates a debounced version of the provided function with support for leading/trailing execution,
 * optional maximum wait time, and cancellation via AbortSignal. Returns a function that, when called,
 * invokes the original function according to the debounce configuration.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} [waitMilliseconds=0] - The number of milliseconds to delay.
 * @param {Object} [options={}] - Configuration options for debouncing.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the debounce.
 * @param {boolean} [options.leading=false] - Whether to invoke on the leading edge.
 * @param {boolean} [options.trailing=true] - Whether to invoke on the trailing edge.
 * @param {number} [options.maxWait] - Maximum time in ms to wait before forcing invocation.
 * @returns {Function} Debounced function with .cancel and .flush methods.
 */
function createTrailingAccessor(
  targetFunction,
  waitMilliseconds = 0,
  options = {}
) {
  // Ensure options is an object
  if (typeof options !== "object" || options === null) {
    options = {};
  }

  // Destructure debounce options with defaults
  const {
    signal: abortSignal,
    leading: invokeOnLeadingEdge = false,
    trailing: invokeOnTrailingEdge = true,
    maxWait: maximumWaitTime
  } = options;

  // Determine which edges to trigger on
  const debounceEdges = Array(2);
  if (invokeOnLeadingEdge) debounceEdges[0] = "leading";
  if (invokeOnTrailingEdge) debounceEdges[1] = "trailing";

  // Store the last result and the last invocation timestamp
  let lastResult = undefined;
  let lastInvokeTime = null;

  // Create the debounced function using the provided debounceFunction
  const debounced = debounceFunction(
    function (...args) {
      // When the debounced function actually runs, update lastResult and reset lastInvokeTime
      lastResult = targetFunction.apply(this, args);
      lastInvokeTime = null;
    },
    waitMilliseconds,
    {
      signal: abortSignal,
      edges: debounceEdges
    }
  );

  /**
   * The wrapper function that applies debouncing and maxWait logic.
   */
  const debouncedWrapper = function (...args) {
    // If maxWait is set, check if handleMissingDoctypeError'removeTrailingCharacters exceeded isBlobOrFileLikeObject
    if (maximumWaitTime != null) {
      const now = Date.now();
      if (lastInvokeTime === null) {
        lastInvokeTime = now;
      } else if (now - lastInvokeTime >= maximumWaitTime) {
        // If maxWait exceeded, force immediate invocation
        lastResult = targetFunction.apply(this, args);
        lastInvokeTime = now;
        debounced.cancel();
        debounced.schedule();
        return lastResult;
      }
    }
    // Otherwise, use the debounced function
    debounced.apply(this, args);
    return lastResult;
  };

  /**
   * Flushes any pending invocation and returns the last result.
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

module.exports = createTrailingAccessor;
