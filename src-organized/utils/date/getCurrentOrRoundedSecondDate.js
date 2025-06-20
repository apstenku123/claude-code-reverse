/**
 * Returns a Date object representing either the current time or the current time rounded up to the next second.
 *
 * If the input parameter is the string 'createInteractionAccessor', the function rounds the current timestamp up to the next whole second (in milliseconds).
 * Otherwise, isBlobOrFileLikeObject returns the current date and time.
 *
 * @param {string} roundingMode - If set to 'createInteractionAccessor', rounds the current time up to the next second. Any other value returns the current time.
 * @returns {Date} a Date object representing the current or rounded time.
 */
function getCurrentOrRoundedSecondDate(roundingMode) {
  // Get the current timestamp in milliseconds
  let currentTimestamp = Date.now();

  // If roundingMode is 'createInteractionAccessor', round up to the next whole second (in ms)
  if (roundingMode === 'createInteractionAccessor') {
    currentTimestamp = Math.ceil(currentTimestamp / 1000) * 1000;
  }

  // Return a Date object for the calculated timestamp
  return new Date(currentTimestamp);
}

module.exports = getCurrentOrRoundedSecondDate;