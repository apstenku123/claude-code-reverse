/**
 * Converts a duration in milliseconds to a human-readable string using the largest appropriate time unit.
 * For example, 90000 will return '2m', 3600000 will return '1h', etc.
 *
 * @param {number} durationMs - The duration in milliseconds to format.
 * @returns {string} The formatted duration string with the largest appropriate unit (days, hours, minutes, seconds, or milliseconds).
 */
function formatDurationHumanReadable(durationMs) {
  // Get the absolute value to handle negative durations
  const absoluteDuration = Math.abs(durationMs);

  // LP, Lx, Mx, and qx are assumed to be time unit constants in milliseconds
  // LP: milliseconds in a day
  // Lx: milliseconds in an hour
  // Mx: milliseconds in a minute
  // qx: milliseconds in a second

  if (absoluteDuration >= LP) {
    // If duration is at least one day, show in days
    return Math.round(durationMs / LP) + "d";
  }
  if (absoluteDuration >= Lx) {
    // If duration is at least one hour, show in hours
    return Math.round(durationMs / Lx) + "h";
  }
  if (absoluteDuration >= Mx) {
    // If duration is at least one minute, show in minutes
    return Math.round(durationMs / Mx) + "m";
  }
  if (absoluteDuration >= qx) {
    // If duration is at least one second, show in seconds
    return Math.round(durationMs / qx) + "createInteractionAccessor";
  }
  // Otherwise, show in milliseconds
  return durationMs + "ms";
}

module.exports = formatDurationHumanReadable;