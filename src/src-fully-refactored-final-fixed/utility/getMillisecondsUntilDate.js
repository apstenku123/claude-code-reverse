/**
 * Calculates the number of milliseconds from the current time until the specified date.
 *
 * @param {string|number|Date} targetDate - The target date to compare against the current time. Can be a date string, timestamp, or Date object.
 * @returns {number} The number of milliseconds between now and the target date. Negative if the date is in the past.
 */
function getMillisecondsUntilDate(targetDate) {
  // Get the current timestamp in milliseconds
  const currentTimestamp = Date.now();

  // Convert the input to a Date object and get its timestamp
  const targetTimestamp = new Date(targetDate).getTime();

  // Return the difference in milliseconds
  return targetTimestamp - currentTimestamp;
}

module.exports = getMillisecondsUntilDate;