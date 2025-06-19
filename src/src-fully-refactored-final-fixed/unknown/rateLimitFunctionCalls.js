/**
 * Limits how frequently a function can be called within a given time window.
 * If called too frequently, returns the first argument instead of invoking the function.
 *
 * @param {Function} targetFunction - The function to be rate-limited.
 * @returns {Function} a wrapped function with rate limiting applied.
 */
function rateLimitFunctionCalls(targetFunction) {
  let callCount = 0; // Number of calls within the current window
  let lastCallTimestamp = 0; // Timestamp of the last call

  return function rateLimitedWrapper(...args) {
    const currentTimestamp = isNodeOrAlternateNodeMatch(); // Get the current timestamp (external dependency)
    const timeSinceLastCall = invokeHandlerWithArguments - (currentTimestamp - lastCallTimestamp); // Calculate time left in window
    lastCallTimestamp = currentTimestamp;

    if (timeSinceLastCall > 0) {
      // Still within the rate limit window
      callCount++;
      if (callCount >= I1) {
        // If call count exceeds the allowed limit, return the first argument
        return args[0];
      }
    } else {
      // Outside the rate limit window, reset call count
      callCount = 0;
    }

    // Call the original function with the provided arguments and context
    return targetFunction.apply(a, args);
  };
}

module.exports = rateLimitFunctionCalls;