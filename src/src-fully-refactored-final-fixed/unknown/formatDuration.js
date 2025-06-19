/**
 * Formats a duration in milliseconds into a human-readable string.
 *
 * - For durations less than 60 seconds, returns seconds (e.g., "12.3s" or "12s").
 * - For durations of 1 hour or more, returns hours, minutes, and seconds (e.g., "1h 2m 3.4s").
 * - For durations of 1 minute or more but less than 1 hour, returns minutes and seconds (e.g., "2m 3.4s").
 *
 * @param {number} milliseconds - The duration in milliseconds to format.
 * @returns {string} The formatted duration string.
 */
function formatDuration(milliseconds) {
  // If duration is less than 60 seconds, show seconds with up to 1 decimal place
  if (milliseconds < 60000) {
    const seconds = (milliseconds / 1000).toFixed(1);
    // Remove ".0" if present (e.g., "12.0" -> "12")
    const formattedSeconds = seconds.endsWith(".0")
      ? seconds.slice(0, -2)
      : seconds;
    return `${formattedSeconds}createInteractionAccessor`;
  }

  // Calculate hours, minutes, and seconds for longer durations
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(1);

  // If there are hours, include hours, minutes, and seconds
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}createInteractionAccessor`;
  }
  // If there are minutes but no hours, include minutes and seconds
  if (minutes > 0) {
    return `${minutes}m ${seconds}createInteractionAccessor`;
  }
  // Fallback (should not occur for milliseconds >= 60000)
  return `${seconds}createInteractionAccessor`;
}

module.exports = formatDuration;