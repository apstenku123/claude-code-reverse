/**
 * Determines if the provided timestamp is within five minutes from the current time.
 *
 * @param {number} targetTimestamp - The timestamp (in milliseconds since epoch) to compare against the current time plus five minutes.
 * @returns {boolean} True if the current time plus five minutes is greater than or equal to the target timestamp; otherwise, false.
 */
function isWithinFiveMinutesFromNow(targetTimestamp) {
  // Calculate the current time plus five minutes (300,000 milliseconds)
  const currentTimePlusFiveMinutes = Date.now() + 300000;
  // Check if the target timestamp is less than or equal to this value
  return currentTimePlusFiveMinutes >= targetTimestamp;
}

module.exports = isWithinFiveMinutesFromNow;