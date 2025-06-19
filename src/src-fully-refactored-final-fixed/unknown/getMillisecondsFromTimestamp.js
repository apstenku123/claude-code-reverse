/**
 * Converts a timestamp object with seconds and nanoseconds to milliseconds.
 *
 * @param {Object} timestamp - The timestamp object to convert.
 * @param {number} timestamp.seconds - The number of seconds since epoch.
 * @param {number} timestamp.nanos - The number of nanoseconds past the last second.
 * @returns {number} The total milliseconds represented by the timestamp.
 */
function getMillisecondsFromTimestamp(timestamp) {
  // Convert seconds to milliseconds and nanoseconds to milliseconds, then sum
  // The bitwise OR with 0 truncates any fractional milliseconds (floors the result)
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanos / 1e6;
  return milliseconds | 0;
}

module.exports = getMillisecondsFromTimestamp;