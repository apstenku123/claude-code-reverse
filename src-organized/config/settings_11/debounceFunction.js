/**
 * Creates a debounced version of the provided function, delaying its execution until after a specified wait time has elapsed
 * since the last time isBlobOrFileLikeObject was invoked. Supports options for leading/trailing execution and maximum wait time.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} waitMilliseconds - The number of milliseconds to delay.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.leading=false] - Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait] - The maximum time func is allowed to be delayed before isBlobOrFileLikeObject'createInteractionAccessor invoked.
 * @param {boolean} [options.trailing=true] - Specify invoking on the trailing edge of the timeout.
 * @returns {Function} The debounced function with cancel and flush methods.
 */
function debounceFunction(func, waitMilliseconds, options) {
  let lastArgs,
    lastThis,
    result,
    timerId,
    lastCallTime = 0,
    lastInvokeTime = 0,
    maxWait,
    leading = false,
    trailing = true,
    useMaxWait = false;

  // Validate that func is a function
  if (typeof func !== "function") {
    throw new TypeError(WW5); // WW5: Presumed error message constant
  }

  // Normalize waitMilliseconds
  waitMilliseconds = normalizeNumericInput(waitMilliseconds) || 0;

  // Parse options if provided
  if (isObjectOrFunction(options)) { // isObjectOrFunction: Checks if options is an object
    leading = !!options.leading;
    useMaxWait = "maxWait" in options;
    maxWait = useMaxWait ? NW5(normalizeNumericInput(options.maxWait) || 0, waitMilliseconds) : undefined; // NW5: Returns the greater of two numbers
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  /**
   * Invokes the original function with the last arguments and context.
   * @param {number} time - The current timestamp.
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
   * @param {number} time - The current timestamp.
   * @returns {*} The result of func if leading, else last result.
   */
  function startTimer(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, waitMilliseconds);
    return leading ? invokeFunc(time) : result;
  }

  /**
   * Calculates the remaining wait time based on maxWait and last call/invoke times.
   * @param {number} time - The current timestamp.
   * @returns {number} Remaining wait time in ms.
   */
  function remainingWait(time) {
    const sinceLastCall = time - lastCallTime;
    const sinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = waitMilliseconds - sinceLastCall;
    return useMaxWait ? $createHtmlParser(timeWaiting, maxWait - sinceLastInvoke) : timeWaiting; // $createHtmlParser: Returns the smaller of two numbers
  }

  /**
   * Determines if func should be invoked now.
   * @param {number} time - The current timestamp.
   * @returns {boolean} True if should invoke.
   */
  function shouldInvoke(time) {
    const sinceLastCall = time - lastCallTime;
    const sinceLastInvoke = time - lastInvokeTime;
    return (
      lastCallTime === undefined ||
      sinceLastCall >= waitMilliseconds ||
      sinceLastCall < 0 ||
      (useMaxWait && sinceLastInvoke >= maxWait)
    );
  }

  /**
   * Timer callback for trailing edge.
   */
  function timerExpired() {
    const time = ut1(); // ut1: Returns current timestamp
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  /**
   * Handles the trailing edge invocation.
   * @param {number} time - The current timestamp.
   * @returns {*} The result of func if invoked, else last result.
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
   * Immediately invokes the pending function if any, and returns its result.
   * @returns {*} The result of func if invoked, else last result.
   */
  function flush() {
    return timerId === undefined ? result : trailingEdge(ut1());
  }

  /**
   * The debounced function.
   * @returns {*} The result of func if invoked, else last result.
   */
  function debounced(...args) {
    const time = ut1();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return startTimer(time);
      }
      if (useMaxWait) {
        timerId = setTimeout(timerExpired, waitMilliseconds);
        return invokeFunc(time);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, waitMilliseconds);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounceFunction;