/**
 * Throttles calls to the provided function, allowing only one call per time window,
 * but resets the throttle if calls are spaced out beyond the window.
 * If too many calls occur within the window, returns the first argument instead of calling the function.
 *
 * @param {Function} targetFunction - The function to be throttled.
 * @returns {Function} - a throttled wrapper function with reset logic.
 */
function throttleWithReset(targetFunction) {
  let callCount = 0;
  let lastCallTimestamp = 0;

  return function throttledFunction(...args) {
    const currentTimestamp = isNodeOrAlternateNodeMatch(); // Get current time (external dependency)
    const timeSinceLastCall = invokeHandlerWithArguments - (currentTimestamp - lastCallTimestamp); // invokeHandlerWithArguments: throttle window (external)
    lastCallTimestamp = currentTimestamp;

    if (timeSinceLastCall > 0) {
      // Within the throttle window
      callCount++;
      if (callCount >= I1) { // I1: max allowed calls per window (external)
        return args[0]; // Return first argument instead of calling the function
      }
    } else {
      // Outside the throttle window, reset call count
      callCount = 0;
    }
    // Call the original function with the current context and arguments
    return targetFunction.apply(a, args); // a: context to apply (external)
  };
}

module.exports = throttleWithReset;