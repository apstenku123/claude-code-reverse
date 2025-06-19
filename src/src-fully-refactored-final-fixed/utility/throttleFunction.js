/**
 * Creates a throttled version of the provided function that only invokes the original function
 * at most once per specified delay. Supports leading and trailing edge invocation, and can be cancelled or flushed.
 *
 * @param {Function} callback - The function to throttle.
 * @param {number} delay - The number of milliseconds to throttle invocations to.
 * @param {Object} [options] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the throttled function.
 * @param {Array<string>} [options.edges] - Array specifying which edges to trigger on: 'leading', 'trailing', or both.
 * @returns {Function} The throttled function with schedule, cancel, and flush methods attached.
 */
function throttleFunction(callback, delay, { signal = undefined, edges = undefined } = {}) {
  let lastThis = undefined;
  let lastArgs = null;
  const invokeOnLeading = edges != null && edges.includes("leading");
  const invokeOnTrailing = edges == null || edges.includes("trailing");

  let timeoutId = null;

  /**
   * Invokes the callback with the last stored arguments and context.
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
   * Schedules the trailing edge invocation after the specified delay.
   */
  const schedule = () => {
    if (timeoutId != null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      handleTrailingEdge();
    }, delay);
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
   * Immediately invokes the callback if pending and cancels any scheduled invocation.
   */
  const flush = () => {
    cancelTimeout();
    invokeCallback();
  };

  /**
   * The throttled function returned to the caller.
   * Stores the latest arguments/context, schedules trailing edge, and optionally invokes leading edge.
   * @param {...*} args - Arguments to pass to the callback.
   */
  function throttled(...args) {
    if (signal?.aborted) return;
    lastThis = this;
    lastArgs = args;
    const isFirstCall = timeoutId == null;
    schedule();
    if (invokeOnLeading && isFirstCall) {
      invokeCallback();
    }
  }

  // Attach control methods
  throttled.schedule = schedule;
  throttled.cancel = reset;
  throttled.flush = flush;

  // If an AbortSignal is provided, cancel on abort
  signal?.addEventListener("abort", reset, { once: true });

  return throttled;
}

module.exports = throttleFunction;
