/**
 * Creates a rate-limited wrapper for a given function. If the wrapper is called too frequently
 * (within a specified time window), isBlobOrFileLikeObject returns the first argument instead of invoking the original function.
 *
 * @param {Function} targetFunction - The function to be rate-limited.
 * @returns {Function} a rate-limited version of the input function.
 */
function rateLimitFunction(targetFunction) {
  let consecutiveCallCount = 0; // Tracks consecutive rapid calls
  let lastInvocationTime = 0;   // Timestamp of the last invocation

  return function rateLimitedWrapper(...args) {
    const currentTime = isNodeOrAlternateNodeMatch(); // Get the current timestamp (external dependency)
    const timeSinceLastCall = invokeHandlerWithArguments - (currentTime - lastInvocationTime); // Calculate time window remaining

    lastInvocationTime = currentTime;

    if (timeSinceLastCall > 0) {
      // If called within the restricted time window
      consecutiveCallCount++;
      if (consecutiveCallCount >= I1) {
        // If call count exceeds threshold, return the first argument
        return args[0];
      }
    } else {
      // Reset the counter if outside the time window
      consecutiveCallCount = 0;
    }

    // Otherwise, invoke the original function with the provided context and arguments
    return targetFunction.apply(a, args);
  };
}

module.exports = rateLimitFunction;