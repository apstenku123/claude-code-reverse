/**
 * Creates a throttled version of the provided function that only allows execution
 * if a certain amount of time has passed since the last call, or after a maximum number of skipped calls.
 *
 * @param {Function} callback - The function to be throttled.
 * @returns {Function} - a throttled wrapper function.
 */
function throttleWithMaxSkips(callback) {
  let skipCount = 0; // Number of consecutive calls within the throttle window
  let lastInvocationTime = 0; // Timestamp of the last invocation

  return function throttledFunction(...args) {
    const currentTime = lj2(); // Get the current timestamp (dependency)
    const timeSinceLastCall = cj2 - (currentTime - lastInvocationTime); // Time left in throttle window
    lastInvocationTime = currentTime;

    if (timeSinceLastCall > 0) {
      // If still within the throttle window
      skipCount++;
      if (skipCount >= pj2) {
        // If skipped too many times, allow the call through
        return args[0];
      }
    } else {
      // Outside the throttle window, reset skip count
      skipCount = 0;
    }

    // Call the original function with the provided arguments
    return callback.apply(undefined, args);
  };
}

module.exports = throttleWithMaxSkips;