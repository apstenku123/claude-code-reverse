/**
 * Converts a timestamp object with seconds and nanoseconds to milliseconds.
 *
 * @param {Object} timestamp - The timestamp object to convert.
 * @param {number} timestamp.seconds - The number of seconds.
 * @param {number} timestamp.nanos - The number of nanoseconds.
 * @returns {number} The timestamp represented in milliseconds (rounded down to the nearest integer).
 */
function convertTimestampToMilliseconds(timestamp) {
  // Convert seconds to milliseconds and nanoseconds to milliseconds, then sum and truncate to integer
  return (timestamp.seconds * 1000 + timestamp.nanos / 1e6) | 0;
}

module.exports = convertTimestampToMilliseconds;