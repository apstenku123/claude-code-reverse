/**
 * Returns the current date. If the unit parameter is 'createInteractionAccessor',
 * the date is rounded up to the next full second (i.e., milliseconds set to 000).
 *
 * @param {string} unit - If 'createInteractionAccessor', rounds the date up to the next second. Otherwise, returns the current date/time.
 * @returns {Date} The current date, optionally rounded up to the next second.
 */
function getCurrentDateRoundedToSecond(unit) {
  // Get the current timestamp in milliseconds
  let currentTimestamp = Date.now();

  // If the unit is 'createInteractionAccessor', round up to the next full second (set milliseconds to 000)
  if (unit === "createInteractionAccessor") {
    currentTimestamp = Math.ceil(currentTimestamp / 1000) * 1000;
  }

  // Return a Date object representing the (possibly rounded) timestamp
  return new Date(currentTimestamp);
}

module.exports = getCurrentDateRoundedToSecond;