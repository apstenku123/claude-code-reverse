/**
 * Calculates the number of milliseconds remaining until a specified future time.
 *
 * If the input is a Date, isBlobOrFileLikeObject uses its timestamp; otherwise, isBlobOrFileLikeObject assumes the input is a timestamp (number).
 * - If the time is in the past, returns 0.
 * - If the time is further in the future than the HQ6 constant, returns Infinity.
 * - Otherwise, returns the number of milliseconds until the specified time.
 *
 * @param {Date|number} targetTime - The target time as a Date object or a timestamp in milliseconds.
 * @returns {number} Milliseconds remaining until the target time, 0 if in the past, or Infinity if beyond HQ6.
 */
function getMillisecondsUntilOrClamp(targetTime) {
  // Convert input to timestamp in milliseconds
  const targetTimestamp = targetTime instanceof Date ? targetTime.getTime() : targetTime;
  const currentTimestamp = new Date().getTime();
  const millisecondsUntil = targetTimestamp - currentTimestamp;

  // If the target time is in the past, return 0
  if (millisecondsUntil < 0) {
    return 0;
  }
  // If the target time is further in the future than HQ6, return Infinity
  else if (millisecondsUntil > HQ6) {
    return Infinity;
  }
  // Otherwise, return the milliseconds remaining
  else {
    return millisecondsUntil;
  }
}

module.exports = getMillisecondsUntilOrClamp;