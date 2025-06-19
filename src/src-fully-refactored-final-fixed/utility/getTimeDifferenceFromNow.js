/**
 * Calculates the difference in milliseconds between a given date/time and the current time.
 *
 * @param {string|number|Date} targetDate - The date/time to compare against the current time. Can be a date string, timestamp, or Date object.
 * @returns {number} The difference in milliseconds between the target date and now. Positive if the target date is in the future, negative if in the past.
 */
function getTimeDifferenceFromNow(targetDate) {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();
  // Convert the target date to a timestamp in milliseconds
  const targetTimestamp = new Date(targetDate).getTime();
  // Return the difference between the target date and now
  return targetTimestamp - currentTimestamp;
}

module.exports = getTimeDifferenceFromNow;