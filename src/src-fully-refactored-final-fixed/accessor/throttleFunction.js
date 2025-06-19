/**
 * Creates a throttled version of the provided function that only invokes the function at most once per every wait period.
 * Supports options for leading/trailing invocation and a maximum wait time.
 *
 * @param {Function} func - The function to throttle.
 * @param {number} wait - The number of milliseconds to throttle invocations to.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.leading=true] - Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - Specify invoking on the trailing edge of the timeout.
 * @param {number} [options.maxWait] - The maximum time func is allowed to be delayed before isBlobOrFileLikeObject'createInteractionAccessor invoked.
 * @returns {Function} The throttled function with cancel and flush methods.
 */
function throttleFunction(func, wait, options) {
  let lastArgs,
    lastThis,
    result,
    timerId,
    lastCallTime = 0,
    lastInvokeTime = 0,
    leading = true,
    trailing = true,
    maxing = false,
    maxWait;

  // Validate that func is a function
  if (typeof func !== "function") {
    throw new TypeError(WW5); // WW5 assumed to be a constant error message
  }

  // Ensure wait is a number
  wait = normalizeNumericInput(wait) || 0;

  // Parse options if provided
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
   * Starts a timer that will invoke the trailing edge after the wait period.
   * @param {number} time - The time when the timer is started.
   * @returns {*} The result of func if leading, else previous result.
   */
  function startTimer(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  /**
   * Calculates the remaining wait time before func can be invoked again.
   * @param {number} time - The current time.
   * @returns {number} Remaining wait time in ms.
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
   * @returns {boolean} True if should invoke, false otherwise.
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
   * Timer callback for trailing edge invocation.
   */
  function timerExpired() {
    const now = ut1(); // ut1 assumed to be a function returning current time
    if (shouldInvoke(now)) {
      return trailingEdge(now);
    }
    timerId = setTimeout(timerExpired, remainingWait(now));
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
    lastCallTime = 0;
    lastArgs = lastThis = timerId = undefined;
  }

  /**
   * Immediately invokes any pending invocation and returns the result.
   * @returns {*} The result of func if invoked, else previous result.
   */
  function flush() {
    return timerId === undefined ? result : trailingEdge(ut1());
  }

  /**
   * The throttled function.
   * @returns {*} The result of func if invoked, else previous result.
   */
  function throttled(...args) {
    const now = ut1();
    const isInvoking = shouldInvoke(now);
    lastArgs = args;
    lastThis = this;
    lastCallTime = now;
    if (isInvoking) {
      if (timerId === undefined) {
        return startTimer(now);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(now);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  throttled.cancel = cancel;
  throttled.flush = flush;
  return throttled;
}

module.exports = throttleFunction;