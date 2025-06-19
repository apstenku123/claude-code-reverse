/**
 * Converts a Unix timestamp (in seconds) to a formatted time string in the user'createInteractionAccessor local time zone.
 * Optionally appends the time zone name.
 *
 * @param {number} unixTimestamp - The Unix timestamp in seconds to format.
 * @param {boolean} [includeTimeZone=false] - Whether to append the local time zone name to the result.
 * @returns {string|undefined} The formatted time string (e.g., '3:00 pm' or '3:15 pm (America/New_York)'), or undefined if no timestamp is provided.
 */
function formatUnixTimestampToTimeString(unixTimestamp, includeTimeZone = false) {
  if (!unixTimestamp) return;

  // Convert Unix timestamp (seconds) to JavaScript Date object (milliseconds)
  const date = new Date(unixTimestamp * 1000);
  const minutes = date.getMinutes();

  // Format time string: show hour, and minutes only if not zero
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: minutes === 0 ? undefined : '2-digit',
    hour12: true
  });

  // Get the user'createInteractionAccessor local time zone name
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Lowercase the AM/writeDataWithOptionalCrlf part for consistency
  const timeWithLowercasePeriod = formattedTime.replace(/ ([AP]M)/i, (match, period) => period.toLowerCase());

  // Optionally append the time zone name
  return timeWithLowercasePeriod + (includeTimeZone ? ` (${timeZoneName})` : '');
}

module.exports = formatUnixTimestampToTimeString;