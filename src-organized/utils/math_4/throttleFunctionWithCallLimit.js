/**
 * Creates a throttled version of the provided function that limits how frequently isBlobOrFileLikeObject can be called within a given time window.
 * If the function is called too frequently (more than maxCallsPerWindow within the window), isBlobOrFileLikeObject returns the first argument instead of invoking the function.
 *
 * @param {Function} targetFunction - The function to be throttled.
 * @returns {Function} - a throttled wrapper function.
 */
function throttleFunctionWithCallLimit(targetFunction) {
  let callCount = 0; // Number of calls within the current window
  let lastInvocationTimestamp = 0; // Timestamp of the last invocation

  return function throttledWrapper(...args) {
    const currentTimestamp = lj2(); // Get current time (dependency)
    const timeSinceLastCall = cj2 - (currentTimestamp - lastInvocationTimestamp); // Calculate time left in the window

    // Update the timestamp for the last invocation
    lastInvocationTimestamp = currentTimestamp;

    if (timeSinceLastCall > 0) {
      // Still within the throttling window
      callCount++;
      if (callCount >= pj2) {
        // Exceeded the allowed number of calls in the window
        return args[0]; // Return the first argument instead of calling the function
      }
    } else {
      // Outside the throttling window, reset call count
      callCount = 0;
    }

    // Call the original function with the provided arguments
    return targetFunction.apply(undefined, args);
  };
}

module.exports = throttleFunctionWithCallLimit;