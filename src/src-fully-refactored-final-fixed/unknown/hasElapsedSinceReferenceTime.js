/**
 * Determines if a specified amount of time has elapsed since a reference timestamp.
 *
 * @returns {boolean} Returns true if the elapsed time since the reference timestamp is greater than or equal to the required duration; otherwise, false.
 */
function hasElapsedSinceReferenceTime() {
  // Get the current time using the external timing utility
  const currentTime = Y_4.unstable_now();
  // Reference timestamp to compare against
  const referenceTimestamp = c30;
  // Required duration that must have elapsed
  const requiredElapsedDuration = p30;

  // Check if the elapsed time is less than the required duration
  // If so, return false; otherwise, return true
  return (currentTime - referenceTimestamp) < requiredElapsedDuration ? false : true;
}

module.exports = hasElapsedSinceReferenceTime;