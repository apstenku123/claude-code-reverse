/**
 * Determines if a given timestamp is within five minutes from the current time.
 *
 * @param {number} timestamp - The timestamp (in milliseconds since the Unix epoch) to compare against the current time.
 * @returns {boolean} True if the current time plus five minutes is greater than or equal to the provided timestamp; otherwise, false.
 */
function isTimestampWithinFiveMinutesFromNow(timestamp) {
  // Get the current time in milliseconds
  const currentTime = Date.now();

  // Calculate the time five minutes from now (300,000 milliseconds = 5 minutes)
  const fiveMinutesFromNow = currentTime + 300000;

  // Return true if five minutes from now is greater than or equal to the given timestamp
  return fiveMinutesFromNow >= timestamp;
}

module.exports = isTimestampWithinFiveMinutesFromNow;