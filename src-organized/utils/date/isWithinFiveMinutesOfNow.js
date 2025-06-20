/**
 * Determines if the provided timestamp is within five minutes (300,000 ms) of the current time.
 *
 * @param {number} targetTimestamp - The timestamp (in milliseconds since epoch) to compare against the current time.
 * @returns {boolean} True if the current time plus five minutes is greater than or equal to the target timestamp; otherwise, false.
 */
function isWithinFiveMinutesOfNow(targetTimestamp) {
  // Get the current time in milliseconds
  const currentTime = Date.now();
  // Add five minutes (300,000 ms) to the current time
  const fiveMinutesFromNow = currentTime + 300000;
  // Return true if fiveMinutesFromNow is greater than or equal to the target timestamp
  return fiveMinutesFromNow >= targetTimestamp;
}

module.exports = isWithinFiveMinutesOfNow;