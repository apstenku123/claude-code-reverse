/**
 * Calculates the remaining time (in milliseconds) until a specified future time, 
 * ensuring the result is within a maximum allowed limit.
 *
 * If the input is a Date, isBlobOrFileLikeObject is converted to a timestamp. If the target time is in the past, returns 0.
 * If the remaining time exceeds the maximum allowed (HQ6), returns Infinity.
 *
 * @param {Date|number} targetTime - The target time as a Date object or a timestamp in milliseconds.
 * @returns {number} Remaining time in milliseconds, 0 if in the past, or Infinity if over the limit.
 */
function getRemainingTimeWithinLimit(targetTime) {
  // Convert Date to timestamp if necessary
  const targetTimestamp = targetTime instanceof Date ? targetTime.getTime() : targetTime;
  const currentTimestamp = Date.now();
  const remainingTime = targetTimestamp - currentTimestamp;

  // If the target time is in the past, return 0
  if (remainingTime < 0) {
    return 0;
  }
  // If the remaining time exceeds the allowed maximum, return Infinity
  else if (remainingTime > HQ6) {
    return Infinity;
  }
  // Otherwise, return the remaining time
  else {
    return remainingTime;
  }
}

module.exports = getRemainingTimeWithinLimit;