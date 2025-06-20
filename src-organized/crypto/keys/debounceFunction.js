/**
 * Creates a debounced version of the provided function, with options for leading and trailing edge execution, and cancellation via AbortSignal.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} waitMilliseconds - The number of milliseconds to delay invocation.
 * @param {Object} [options] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel pending executions.
 * @param {Array<string>} [options.edges] - Array specifying which edges to trigger on: 'leading', 'trailing', or both.
 * @returns {Function} The debounced function, with schedule, cancel, and flush methods attached.
 */
function debounceFunction(targetFunction, waitMilliseconds, {
  signal = undefined,
  edges = undefined
} = {}) {
  let lastThis = undefined;
  let lastArgs = null;
  const isLeading = Array.isArray(edges) && edges.includes("leading");
  const isTrailing = !edges || edges.includes("trailing");

  let timeoutId = null;

  /**
   * Invokes the target function with the last provided context and arguments.
   */
  const invoke = () => {
    if (lastArgs !== null) {
      targetFunction.apply(lastThis, lastArgs);
      lastThis = undefined;
      lastArgs = null;
    }
  };

  /**
   * Handles the trailing edge: invokes if allowed, then resets state.
   */
  const handleTrailingEdge = () => {
    if (isTrailing) invoke();
    reset();
  };

  /**
   * Schedules the trailing edge invocation.
   */
  const schedule = () => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      handleTrailingEdge();
    }, waitMilliseconds);
  };

  /**
   * Cancels any scheduled invocation.
   */
  const cancelTimeout = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /**
   * Resets all internal state and cancels any scheduled invocation.
   */
  const reset = () => {
    cancelTimeout();
    lastThis = undefined;
    lastArgs = null;
  };

  /**
   * Immediately invokes the target function if pending, and cancels any scheduled invocation.
   */
  const flush = () => {
    cancelTimeout();
    invoke();
  };

  /**
   * The debounced function that will be returned.
   * @param  {...any} args - Arguments to pass to the target function.
   */
  function debounced(...args) {
    // If aborted, do nothing
    if (signal?.aborted) return;
    lastThis = this;
    lastArgs = args;
    const shouldInvokeLeading = timeoutId == null;
    schedule();
    // If leading edge is enabled and this is the first call in a burst, invoke immediately
    if (isLeading && shouldInvokeLeading) invoke();
  }

  // Attach control methods
  debounced.schedule = schedule;
  debounced.cancel = reset;
  debounced.flush = flush;

  // If an AbortSignal is provided, cancel on abort
  if (signal) {
    signal.addEventListener("abort", reset, { once: true });
  }

  return debounced;
}

module.exports = debounceFunction;