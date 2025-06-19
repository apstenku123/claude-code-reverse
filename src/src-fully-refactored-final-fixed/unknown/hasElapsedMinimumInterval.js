/**
 * Determines if the minimum required interval has elapsed since a reference timestamp.
 *
 * @returns {boolean} Returns true if the minimum interval has elapsed, otherwise false.
 */
function hasElapsedMinimumInterval() {
  // Get the current timestamp using the provided timing utility
  const currentTimestamp = Y_4.unstable_now();
  // Reference timestamp from which to measure the interval
  const referenceTimestamp = c30;
  // The minimum interval (in the same units as the timestamps)
  const minimumInterval = p30;

  // Check if the time elapsed since the reference timestamp is less than the minimum interval
  // If so, return false; otherwise, return true
  return (currentTimestamp - referenceTimestamp) < minimumInterval ? false : true;
}

module.exports = hasElapsedMinimumInterval;