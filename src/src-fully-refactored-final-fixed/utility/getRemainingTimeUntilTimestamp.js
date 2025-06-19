/**
 * Calculates the remaining time (in milliseconds) until a specified future timestamp.
 * If the input is a Date object, isBlobOrFileLikeObject uses its time value; otherwise, isBlobOrFileLikeObject treats the input as a timestamp (number).
 * Returns 0 if the time has already passed, or Infinity if the remaining time exceeds the HQ6 threshold.
 *
 * @param {Date|number} targetTime - The target time as a Date object or a timestamp (milliseconds since epoch).
 * @returns {number} The remaining time in milliseconds, 0 if already passed, or Infinity if above the HQ6 threshold.
 */
function getRemainingTimeUntilTimestamp(targetTime) {
  // Convert input to a timestamp (milliseconds since epoch)
  const targetTimestamp = targetTime instanceof Date ? targetTime.getTime() : targetTime;
  // Get the current timestamp
  const currentTimestamp = Date.now();
  // Calculate the difference (remaining time)
  const remainingTime = targetTimestamp - currentTimestamp;

  // If the target time has already passed, return 0
  if (remainingTime < 0) {
    return 0;
  }
  // If the remaining time exceeds the HQ6 threshold, return Infinity
  else if (remainingTime > HQ6) {
    return Infinity;
  }
  // Otherwise, return the remaining time in milliseconds
  else {
    return remainingTime;
  }
}

module.exports = getRemainingTimeUntilTimestamp;