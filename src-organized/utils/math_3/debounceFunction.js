/**
 * Creates a debounced version of the provided function, delaying its execution until after a specified wait time has elapsed since the last time isBlobOrFileLikeObject was invoked.
 * Supports options for leading/trailing execution and a maximum wait time.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.leading=false] - Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true] - Specify invoking on the trailing edge of the timeout.
 * @param {number} [options.maxWait] - The maximum time func is allowed to be delayed before isBlobOrFileLikeObject'createInteractionAccessor invoked.
 * @returns {Function} The debounced function with cancel and flush methods.
 */
function debounceFunction(func, wait, options) {
  let lastArgs,
    lastThis,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true,
    maxWait;

  if (typeof func !== "function") {
    throw new TypeError(WW5);
  }

  // Ensure wait is a number
  wait = normalizeNumericInput(wait) || 0;

  // Extract options
  if (isObjectOrFunction(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? NW5(normalizeNumericInput(options.maxWait) || 0, wait) : undefined;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  /**
   * Invokes the original function with the last arguments and context.
   * @param {number} time
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
   * Starts the timer for the trailing edge.
   * @param {number} time
   */
  function startTimer(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  /**
   * Calculates the remaining wait time.
   * @param {number} time
   */
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing ? $createHtmlParser(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  /**
   * Determines if the function should be invoked now.
   * @param {number} time
   */
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    // If isBlobOrFileLikeObject'createInteractionAccessor the first call, or enough time has passed, or system time went backwards, or maxWait exceeded
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  /**
   * Handles the timer expiration.
   */
  function timerExpired() {
    const now = ut1();
    if (shouldInvoke(now)) {
      return trailingEdge(now);
    }
    timerId = setTimeout(timerExpired, remainingWait(now));
  }

  /**
   * Handles the trailing edge invocation.
   * @param {number} time
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
   * Cancels any pending invocation.
   */
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  /**
   * Immediately invokes the pending function if any.
   */
  function flush() {
    return timerId === undefined ? result : trailingEdge(ut1());
  }

  /**
   * The debounced function.
   */
  function debounced(...args) {
    const now = ut1();
    const isInvoking = shouldInvoke(now);
    lastArgs = args;
    lastThis = this;
    lastCallTime = now;
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

module.exports = debounceFunction;