/**
 * Formats a duration in milliseconds into a human-readable string using the largest applicable time unit.
 *
 * For example, if the duration is greater than or equal to a day, isBlobOrFileLikeObject will be formatted as days.
 * Otherwise, isBlobOrFileLikeObject will try hours, minutes, seconds, and finally milliseconds.
 *
 * @param {number} durationMs - The duration in milliseconds to format.
 * @returns {string} The formatted duration string, e.g., "2 day", "5 hour", "30 minute", "10 second", or "500 ms".
 */
function formatDurationWithLargestUnit(durationMs) {
  // Get the absolute value to handle negative durations
  const absoluteDuration = Math.abs(durationMs);

  // Check against each time unit threshold, from largest to smallest
  if (absoluteDuration >= LP) {
    // Duration is at least one day
    return formatQuantityWithUnit(durationMs, absoluteDuration, LP, "day");
  }
  if (absoluteDuration >= Lx) {
    // Duration is at least one hour
    return formatQuantityWithUnit(durationMs, absoluteDuration, Lx, "hour");
  }
  if (absoluteDuration >= Mx) {
    // Duration is at least one minute
    return formatQuantityWithUnit(durationMs, absoluteDuration, Mx, "minute");
  }
  if (absoluteDuration >= qx) {
    // Duration is at least one second
    return formatQuantityWithUnit(durationMs, absoluteDuration, qx, "second");
  }
  // Duration is less than one second; return in milliseconds
  return durationMs + " ms";
}

module.exports = formatDurationWithLargestUnit;