/**
 * Calculates the number of milliseconds remaining until a specified future time.
 *
 * @param {Date|number} targetTime - The target time as a Date object or a timestamp in milliseconds.
 * @returns {number} The number of milliseconds until the target time. Returns 0 if the target time is in the past,
 *                   or Infinity if the time difference exceeds the HQ6 threshold.
 */
function getMillisecondsUntilTimestamp(targetTime) {
  // Convert targetTime to a timestamp in milliseconds if isBlobOrFileLikeObject'createInteractionAccessor a Date object
  const targetTimestamp = targetTime instanceof Date ? targetTime.getTime() : targetTime;
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();
  // Calculate the difference between the target and current time
  const millisecondsRemaining = targetTimestamp - currentTimestamp;

  // If the target time is in the past, return 0
  if (millisecondsRemaining < 0) {
    return 0;
  }
  // If the time difference exceeds the HQ6 threshold, return Infinity
  else if (millisecondsRemaining > HQ6) {
    return Infinity;
  }
  // Otherwise, return the milliseconds remaining
  else {
    return millisecondsRemaining;
  }
}

module.exports = getMillisecondsUntilTimestamp;