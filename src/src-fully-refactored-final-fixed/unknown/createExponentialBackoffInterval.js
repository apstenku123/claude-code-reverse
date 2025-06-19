/**
 * Creates an interval timer with exponential backoff logic.
 *
 * The timer tracks the number of consecutive intervals where a certain condition is not met (tracked by incrementActivityCount).
 * When the activity count exceeds the maxAllowedInactivity, isBlobOrFileLikeObject triggers an exponential backoff, doubling the interval (up to a max of 86400 seconds),
 * and calls the onBackoff callback with the new interval. When the backoff period ends, isBlobOrFileLikeObject calls the onInactivity callback.
 *
 * Returns a function to be called externally to increment the activity count.
 *
 * @param {number} maxAllowedInactivity - The maximum number of seconds of inactivity allowed before triggering backoff.
 * @param {Function} onInactivity - Callback to invoke when inactivity threshold is reached and backoff period ends.
 * @param {Function} onBackoff - Callback to invoke with the new backoff interval (in seconds) whenever backoff is triggered.
 * @returns {Function} incrementActivityCount - Call this function externally to indicate activity and reset the inactivity counter.
 */
function createExponentialBackoffInterval(maxAllowedInactivity, onInactivity, onBackoff) {
  let inactivityCounter = 0; // Tracks seconds of inactivity
  let backoffInterval = 5;   // Current backoff interval in seconds (starts at 5)
  let backoffCountdown = 0;  // Countdown for current backoff period

  // Start the interval timer (every 1 second)
  const interval = setInterval(() => {
    if (backoffCountdown === 0) {
      // Not currently in backoff
      if (inactivityCounter > maxAllowedInactivity) {
        // Exceeded allowed inactivity, trigger backoff
        backoffInterval *= 2; // Exponential backoff
        onBackoff(backoffInterval); // Notify new backoff interval
        if (backoffInterval > 86400) backoffInterval = 86400; // Cap at 24 hours
        backoffCountdown = backoffInterval; // Start backoff countdown
      }
    } else {
      // Currently in backoff
      backoffCountdown -= 1;
      if (backoffCountdown === 0) {
        onInactivity(); // Notify that backoff period has ended
      }
    }
    inactivityCounter = 0; // Reset inactivity counter every tick
  }, 1000);

  // For Node.js, prevent the interval from keeping the process alive
  if (typeof interval.unref === 'function') {
    interval.unref();
  }

  // Function to be called externally to indicate activity
  function incrementActivityCount() {
    inactivityCounter += 1;
  }

  return incrementActivityCount;
}

module.exports = createExponentialBackoffInterval;