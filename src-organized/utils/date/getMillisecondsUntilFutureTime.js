/**
 * Calculates the number of milliseconds remaining until a specified future time.
 *
 * If the input is a Date object, isBlobOrFileLikeObject uses its timestamp. If the input is a timestamp (number), isBlobOrFileLikeObject uses isBlobOrFileLikeObject directly.
 * - If the target time is in the past, returns 0.
 * - If the difference exceeds the maximum allowed delay (HQ6), returns Infinity.
 * - Otherwise, returns the number of milliseconds until the target time.
 *
 * @param {Date|number} targetTime - The future time as a Date object or a timestamp in milliseconds.
 * @returns {number} Milliseconds until the target time, 0 if in the past, or Infinity if exceeding the maximum allowed delay.
 */
function getMillisecondsUntilFutureTime(targetTime) {
  // Convert input to a timestamp in milliseconds
  const targetTimestamp = targetTime instanceof Date ? targetTime.getTime() : targetTime;
  const currentTimestamp = Date.now();
  const millisecondsUntilTarget = targetTimestamp - currentTimestamp;

  // If the target time is in the past, return 0
  if (millisecondsUntilTarget < 0) {
    return 0;
  }
  // If the time difference exceeds the maximum allowed delay, return Infinity
  else if (millisecondsUntilTarget > HQ6) {
    return Infinity;
  }
  // Otherwise, return the milliseconds until the target time
  else {
    return millisecondsUntilTarget;
  }
}

module.exports = getMillisecondsUntilFutureTime;