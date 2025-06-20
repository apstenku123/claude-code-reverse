/**
 * Creates a debounced version of the provided function, with support for leading/trailing edge invocation and abort signals.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} waitMilliseconds - The number of milliseconds to delay invocation.
 * @param {Object} [options] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - An AbortSignal to cancel pending invocations.
 * @param {Array<'leading'|'trailing'>} [options.edges] - Which edges to trigger on ('leading', 'trailing'). Defaults to ['trailing'].
 * @returns {Function} The debounced function, with .schedule(), .cancel(), and .flush() methods.
 */
function debounceFunctionWithEdgesAndAbort(targetFunction, waitMilliseconds, {
  signal: abortSignal,
  edges: edgeOptions
} = {}) {
  let lastThis = undefined; // The 'this' context for the next invocation
  let lastArgs = null;      // Arguments for the next invocation
  const invokeOnLeading = edgeOptions != null && edgeOptions.includes('leading');
  const invokeOnTrailing = edgeOptions == null || edgeOptions.includes('trailing');

  let timeoutId = null;     // Timeout handle for scheduled invocation

  /**
   * Actually invokes the target function with the last context and arguments.
   */
  const invoke = () => {
    if (lastArgs !== null) {
      targetFunction.apply(lastThis, lastArgs);
      lastThis = undefined;
      lastArgs = null;
    }
  };

  /**
   * Called when the debounce timer fires. Invokes on trailing edge if configured.
   */
  const handleTimeout = () => {
    if (invokeOnTrailing) {
      invoke();
    }
    reset();
  };

  /**
   * Schedules a new debounce timeout, clearing any previous one.
   */
  const schedule = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      handleTimeout();
    }, waitMilliseconds);
  };

  /**
   * Cancels any pending debounce timeout.
   */
  const cancelTimeout = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /**
   * Resets internal state and cancels any pending invocation.
   */
  const reset = () => {
    cancelTimeout();
    lastThis = undefined;
    lastArgs = null;
  };

  /**
   * Immediately invokes the function if pending, and cancels further invocations.
   */
  const flush = () => {
    cancelTimeout();
    invoke();
  };

  /**
   * The debounced function returned to the caller.
   * @param {...any} args - Arguments to pass to the target function.
   */
  function debouncedFunction(...args) {
    // If the abort signal is triggered, do nothing
    if (abortSignal?.aborted) return;
    lastThis = this;
    lastArgs = args;
    const isFirstCall = timeoutId == null;
    schedule();
    // If leading edge is enabled and this is the first call in a debounce window, invoke immediately
    if (invokeOnLeading && isFirstCall) {
      invoke();
    }
  }

  // Attach utility methods
  debouncedFunction.schedule = schedule;
  debouncedFunction.cancel = reset;
  debouncedFunction.flush = flush;

  // If an abort signal is provided, cancel on abort
  abortSignal?.addEventListener('abort', reset, { once: true });

  return debouncedFunction;
}

module.exports = debounceFunctionWithEdgesAndAbort;