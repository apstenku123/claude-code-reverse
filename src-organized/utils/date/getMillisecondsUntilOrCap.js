/**
 * Calculates the number of milliseconds remaining until a specified future time, capping the value at a maximum threshold.
 *
 * If the input is a Date, isBlobOrFileLikeObject is converted to a timestamp. If the time is in the past, returns 0.
 * If the time difference exceeds the HQ6 threshold, returns Infinity.
 * Otherwise, returns the number of milliseconds remaining.
 *
 * @param {Date|number} targetTime - The future time as a Date object or a timestamp in milliseconds.
 * @returns {number} Milliseconds remaining until the target time, 0 if in the past, or Infinity if above the threshold.
 */
function getMillisecondsUntilOrCap(targetTime) {
  // Convert Date to timestamp if necessary
  const targetTimestamp = targetTime instanceof Date ? targetTime.getTime() : targetTime;
  const currentTimestamp = Date.now();
  const millisecondsRemaining = targetTimestamp - currentTimestamp;

  // If the target time is in the past, return 0
  if (millisecondsRemaining < 0) {
    return 0;
  }
  // If the time difference exceeds the allowed maximum (HQ6), return Infinity
  else if (millisecondsRemaining > HQ6) {
    return Infinity;
  }
  // Otherwise, return the milliseconds remaining
  else {
    return millisecondsRemaining;
  }
}

module.exports = getMillisecondsUntilOrCap;