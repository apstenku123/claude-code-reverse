/**
 * Creates a debounced version of the provided function, with support for leading/trailing edge execution and abort signals.
 *
 * @param {Function} targetFunction - The function to debounce.
 * @param {number} delayMs - The debounce delay in milliseconds.
 * @param {Object} [options] - Optional configuration object.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the debounced function.
 * @param {string[]} [options.edges] - Array specifying which edges to trigger on: 'leading', 'trailing', or both.
 * @returns {Function} The debounced function, with schedule, cancel, and flush methods attached.
 */
function createDebouncedFunction(targetFunction, delayMs, { signal: abortSignal, edges: edgeOptions } = {}) {
  let lastThisContext = undefined;
  let lastArguments = null;
  const isLeadingEdge = edgeOptions != null && edgeOptions.includes('leading');
  const isTrailingEdge = edgeOptions == null || edgeOptions.includes('trailing');

  let timeoutId = null;

  /**
   * Executes the target function with the last provided context and arguments.
   */
  const invokeFunction = () => {
    if (lastArguments !== null) {
      targetFunction.apply(lastThisContext, lastArguments);
      lastThisContext = undefined;
      lastArguments = null;
    }
  };

  /**
   * Handles the trailing edge execution and cleanup.
   */
  const handleTrailingEdge = () => {
    if (isTrailingEdge) invokeFunction();
    reset();
  };

  /**
   * Schedules the trailing edge execution after the specified delay.
   */
  const schedule = () => {
    if (timeoutId != null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      handleTrailingEdge();
    }, delayMs);
  };

  /**
   * Cancels any pending scheduled execution.
   */
  const cancelTimeout = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /**
   * Resets the internal state and cancels any pending execution.
   */
  const reset = () => {
    cancelTimeout();
    lastThisContext = undefined;
    lastArguments = null;
  };

  /**
   * Immediately invokes the function if pending and cancels further execution.
   */
  const flush = () => {
    cancelTimeout();
    invokeFunction();
  };

  /**
   * The debounced function that will be returned.
   * @param {...any} args - Arguments to pass to the target function.
   */
  function debouncedFunction(...args) {
    // If the abort signal is triggered, do nothing
    if (abortSignal?.aborted) return;
    lastThisContext = this;
    lastArguments = args;
    const isFirstCall = timeoutId == null;
    schedule();
    // If leading edge is enabled and this is the first call, invoke immediately
    if (isLeadingEdge && isFirstCall) {
      invokeFunction();
    }
  }

  // Attach utility methods to the debounced function
  debouncedFunction.schedule = schedule;
  debouncedFunction.cancel = reset;
  debouncedFunction.flush = flush;

  // If an abort signal is provided, cancel on abort
  abortSignal?.addEventListener('abort', reset, { once: true });

  return debouncedFunction;
}

module.exports = createDebouncedFunction;
