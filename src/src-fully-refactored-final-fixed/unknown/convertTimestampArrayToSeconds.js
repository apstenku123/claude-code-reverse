/**
 * Converts a timestamp represented as an array into a floating-point value in seconds.
 *
 * The input array is expected to have two numeric elements:
 *   - The first element represents whole seconds (integer).
 *   - The second element represents microseconds (integer).
 *
 * The function multiplies the seconds by 1000 to get milliseconds, then adds the microseconds divided by 1,000,000 to get the fractional part in seconds.
 *
 * @param {number[]} timestampArray - An array where [0] is seconds and [1] is microseconds.
 * @returns {number} The combined timestamp as a floating-point number in milliseconds.
 */
function convertTimestampArrayToSeconds(timestampArray) {
  // Multiply seconds by 1000 to convert to milliseconds, then add microseconds converted to milliseconds
  return timestampArray[0] * 1000 + timestampArray[1] / 1e6;
}

module.exports = convertTimestampArrayToSeconds;