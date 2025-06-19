/**
 * Creates a throttled version of the provided function that limits how frequently isBlobOrFileLikeObject can be called.
 * If called repeatedly within a certain interval, isBlobOrFileLikeObject will only allow a maximum number of attempts before returning the first argument directly.
 *
 * @param {Function} callback - The function to be throttled.
 * @returns {Function} a throttled wrapper function.
 */
function throttleWithMaxAttempts(callback) {
  let consecutiveCallCount = 0; // Tracks consecutive calls within the throttle interval
  let lastCallTimestamp = 0;    // Timestamp of the last call

  return function throttledFunction(...args) {
    const currentTimestamp = lj2(); // Get current time (dependency)
    const timeSinceLastCall = cj2 - (currentTimestamp - lastCallTimestamp); // Calculate time left in throttle interval
    lastCallTimestamp = currentTimestamp;

    if (timeSinceLastCall > 0) {
      // Within throttle interval
      consecutiveCallCount++;
      if (consecutiveCallCount >= pj2) {
        // Exceeded max allowed attempts, return first argument directly
        return args[0];
      }
    } else {
      // Outside throttle interval, reset counter
      consecutiveCallCount = 0;
    }

    // Call the original callback with all arguments
    return callback.apply(undefined, args);
  };
}

module.exports = throttleWithMaxAttempts;