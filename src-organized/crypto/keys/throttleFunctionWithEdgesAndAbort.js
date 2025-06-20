/**
 * Creates a throttled version of the provided function, with support for leading/trailing edge invocation and abort signals.
 *
 * @param {Function} callback - The function to be throttled.
 * @param {number} waitMilliseconds - The number of milliseconds to throttle invocations.
 * @param {Object} [options] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - An AbortSignal to cancel scheduled executions.
 * @param {Array<string>} [options.edges] - Array containing 'leading' and/or 'trailing' to control invocation on leading/trailing edge.
 * @returns {Function} The throttled function, with schedule, cancel, and flush methods attached.
 */
function throttleFunctionWithEdgesAndAbort(callback, waitMilliseconds, {
  signal = undefined,
  edges = undefined
} = {}) {
  let lastThis = undefined; // The 'this' context for the callback
  let lastArgs = null;      // The arguments for the callback

  // Determine if leading/trailing edge invocation is enabled
  const invokeOnLeading = edges != null && edges.includes("leading");
  const invokeOnTrailing = edges == null || edges.includes("trailing");

  let timeoutId = null; // Stores the current timeout updateSnapshotAndNotify

  /**
   * Invokes the callback with the last stored context and arguments.
   */
  const invokeCallback = () => {
    if (lastArgs !== null) {
      callback.apply(lastThis, lastArgs);
      lastThis = undefined;
      lastArgs = null;
    }
  };

  /**
   * Handles the trailing edge: invokes callback if needed and clears state.
   */
  const handleTrailingEdge = () => {
    if (invokeOnTrailing) invokeCallback();
    reset();
  };

  /**
   * Schedules the trailing edge invocation after the wait period.
   */
  const schedule = () => {
    if (timeoutId != null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      handleTrailingEdge();
    }, waitMilliseconds);
  };

  /**
   * Cancels any scheduled invocation.
   */
  const cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /**
   * Resets all internal state and cancels any scheduled invocation.
   */
  const reset = () => {
    cancel();
    lastThis = undefined;
    lastArgs = null;
  };

  /**
   * Immediately invokes the callback if pending and cancels any scheduled invocation.
   */
  const flush = () => {
    cancel();
    invokeCallback();
  };

  /**
   * The throttled function returned to the user.
   * Stores context and arguments, schedules execution, and handles leading edge if needed.
   * @param {...*} args - Arguments to pass to the callback.
   */
  function throttledFunction(...args) {
    if (signal?.aborted) return;
    lastThis = this;
    lastArgs = args;
    const isFirstCall = timeoutId == null;
    schedule();
    // If leading edge is enabled and this is the first call in the window, invoke immediately
    if (invokeOnLeading && isFirstCall) {
      invokeCallback();
    }
  }

  // Attach utility methods
  throttledFunction.schedule = schedule;
  throttledFunction.cancel = reset;
  throttledFunction.flush = flush;

  // If an abort signal is provided, cancel on abort
  signal?.addEventListener("abort", reset, { once: true });

  return throttledFunction;
}

module.exports = throttleFunctionWithEdgesAndAbort;