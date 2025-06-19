/**
 * Creates a debounced version of the provided function, with options for leading/trailing invocation and max wait time.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.leading=false] - Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait] - The maximum time func is allowed to be delayed before isBlobOrFileLikeObject'createInteractionAccessor invoked.
 * @param {boolean} [options.trailing=true] - Specify invoking on the trailing edge of the timeout.
 * @returns {Function} The new debounced function, with .cancel() and .flush() methods.
 */
function createDebouncedFunction(func, wait, options) {
  let lastArgs,
    lastThis,
    result,
    lastCallTime,
    lastInvokeTime = 0,
    timerId,
    maxWait,
    leading = false,
    trailing = true,
    maxing = false;

  if (typeof func !== "function") {
    throw new TypeError(WW5); // WW5: Error message constant
  }

  // Normalize wait value
  wait = normalizeNumericInput(wait) || 0;

  // Parse options
  if (isObjectOrFunction(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? NW5(normalizeNumericInput(options.maxWait) || 0, wait) : undefined;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  /**
   * Invokes the original function with the last arguments and context.
   * @param {number} time - The time of invocation.
   * @returns {*} The result of func.
   */
  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  /**
   * Starts a timer to invoke the trailing edge after the wait period.
   * @param {number} time - The current time.
   * @returns {*} The result of func if leading, else previous result.
   */
  function startTimer(time) {
    lastCallTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  /**
   * Calculates the remaining wait time before func should be invoked.
   * @param {number} time - The current time.
   * @returns {number} Remaining wait time.
   */
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing ? $createHtmlParser(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  /**
   * Determines if func should be invoked now.
   * @param {number} time - The current time.
   * @returns {boolean} True if func should be invoked.
   */
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  /**
   * Timer callback for trailing edge.
   */
  function timerExpired() {
    const time = ut1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  /**
   * Handles the trailing edge invocation.
   * @param {number} time - The current time.
   * @returns {*} The result of func if invoked, else previous result.
   */
  function trailingEdge(time) {
    timerId = undefined;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  /**
   * Cancels any pending invocation and resets state.
   */
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  /**
   * Immediately invokes func if pending, else returns last result.
   * @returns {*} The result of func.
   */
  function flush() {
    return timerId === undefined ? result : trailingEdge(ut1());
  }

  /**
   * The debounced function.
   * @returns {*} The result of func if invoked, else previous result.
   */
  function debounced(/* ...args */) {
    const time = ut1();
    const isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return startTimer(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = createDebouncedFunction;