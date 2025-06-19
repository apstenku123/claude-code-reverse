/**
 * Creates a debounced version of the provided function, with optional leading/trailing edge invocation and abort signal support.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} delayMs - The debounce delay in milliseconds.
 * @param {Object} [options] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel debounced calls.
 * @param {Array<string>} [options.edges] - Array specifying which edges to trigger on: 'leading', 'trailing', or both.
 * @returns {Function} Debounced function with schedule, cancel, and flush methods attached.
 */
function debounceFunctionWithEdges(targetFunction, delayMs, {
  signal: abortSignal,
  edges: edgeOptions
} = {}) {
  let lastThis = undefined; // The 'this' context for the target function
  let lastArgs = null;      // Arguments to pass to the target function
  const isLeading = edgeOptions != null && edgeOptions.includes("leading");
  const isTrailing = edgeOptions == null || edgeOptions.includes("trailing");

  let timeoutId = null;     // Stores the active timeout updateSnapshotAndNotify

  /**
   * Calls the target function with the last context and arguments.
   */
  const invokeTarget = () => {
    if (lastArgs !== null) {
      targetFunction.apply(lastThis, lastArgs);
      lastThis = undefined;
      lastArgs = null;
    }
  };

  /**
   * Handles the trailing edge: invokes if trailing is enabled, then resets state.
   */
  const handleTrailingEdge = () => {
    if (isTrailing) invokeTarget();
    reset();
  };

  /**
   * Schedules the trailing edge invocation after the debounce delay.
   */
  const schedule = () => {
    if (timeoutId != null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      handleTrailingEdge();
    }, delayMs);
  };

  /**
   * Cancels any pending invocation and clears state.
   */
  const cancelTimeout = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /**
   * Resets all state and cancels any pending invocation.
   */
  const reset = () => {
    cancelTimeout();
    lastThis = undefined;
    lastArgs = null;
  };

  /**
   * Immediately invokes the target function if pending, and cancels further invocations.
   */
  const flush = () => {
    cancelTimeout();
    invokeTarget();
  };

  /**
   * The debounced function that users will call.
   * Handles leading/trailing edge logic and abort signal.
   * @param  {...any} args - Arguments to pass to the target function.
   */
  function debounced(...args) {
    // If aborted, do nothing
    if (abortSignal?.aborted) return;
    lastThis = this;
    lastArgs = args;
    const isFirstCall = timeoutId == null;
    schedule();
    // If leading edge is enabled and this is the first call in the debounce window, invoke immediately
    if (isLeading && isFirstCall) {
      invokeTarget();
    }
  }

  // Attach control methods to the debounced function
  debounced.schedule = schedule;
  debounced.cancel = reset;
  debounced.flush = flush;

  // If an abort signal is provided, cancel on abort
  abortSignal?.addEventListener("abort", reset, { once: true });

  return debounced;
}

module.exports = debounceFunctionWithEdges;