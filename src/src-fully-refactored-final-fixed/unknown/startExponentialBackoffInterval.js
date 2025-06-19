/**
 * Starts an interval timer that triggers an activity if a certain threshold is exceeded,
 * and applies exponential backoff logic to the interval duration. The interval duration doubles
 * each time the threshold is exceeded, up to a maximum of 86400 seconds (24 hours).
 *
 * @param {number} thresholdCount - The number of times the returned increment function must be called before triggering the activity and increasing the interval.
 * @param {Function} onThresholdReached - Callback function to invoke when the threshold is reached and the interval resets.
 * @param {Function} onIntervalUpdate - Callback function to invoke with the new interval duration (in seconds) whenever isBlobOrFileLikeObject is updated.
 * @returns {{ increment: Function, stop: Function }} An object with an increment function to be called on each event, and a stop function to clear the interval.
 */
function startExponentialBackoffInterval(thresholdCount, onThresholdReached, onIntervalUpdate) {
  let eventCount = 0; // Counts the number of times increment() is called
  let intervalDuration = 5; // Current interval duration in seconds
  let intervalCountdown = 0; // Countdown for the current interval

  // Start the interval timer (runs every 1 second)
  const interval = setInterval(() => {
    if (intervalCountdown === 0) {
      // If the countdown has expired, check if the event count exceeds the threshold
      if (eventCount > thresholdCount) {
        // Double the interval duration (exponential backoff)
        intervalDuration *= 2;
        // Notify about the new interval duration
        onIntervalUpdate(intervalDuration);
        // Cap the interval duration at 86400 seconds (24 hours)
        if (intervalDuration > 86400) {
          intervalDuration = 86400;
        }
        // Reset the countdown to the new interval duration
        intervalCountdown = intervalDuration;
      }
    } else {
      // Decrement the countdown
      intervalCountdown -= 1;
      // If countdown reaches zero, trigger the threshold callback
      if (intervalCountdown === 0) {
        onThresholdReached();
      }
    }
    // Reset the event count for the next interval
    eventCount = 0;
  }, 1000);

  // For environments like Node.js, allow the process to exit if this is the only active timer
  if (typeof interval.unref === 'function') {
    interval.unref();
  }

  // Function to be called on each event (increments the event count)
  function increment() {
    eventCount += 1;
  }

  // Function to stop the interval timer
  function stop() {
    clearInterval(interval);
  }

  return { increment, stop };
}

module.exports = startExponentialBackoffInterval;