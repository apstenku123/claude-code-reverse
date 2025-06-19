/**
 * Attempts to parse the input as a Unix timestamp (in seconds) or a date string.
 * If the input is a valid integer, returns the timestamp in milliseconds (seconds * 1000).
 * If not, tries to parse the input as a date string and returns the difference (in ms) from the reference time.
 * If both parsing attempts fail, returns the fallback value `t5A`.
 *
 * @param {string|number} input - The value to parse as a timestamp or date string.
 * @param {number} [referenceTime=Date.now()] - The reference time in milliseconds to compare against (defaults to now).
 * @returns {number|any} The parsed timestamp in ms, the date difference in ms, or the fallback value `t5A`.
 */
function parseTimestampOrDateDifference(input, referenceTime = Date.now()) {
  // Attempt to parse as integer (Unix timestamp in seconds)
  const parsedTimestampSeconds = parseInt(`${input}`, 10);
  if (!isNaN(parsedTimestampSeconds)) {
    // Convert seconds to milliseconds
    return parsedTimestampSeconds * 1000;
  }

  // Attempt to parse as date string
  const parsedDateMilliseconds = Date.parse(`${input}`);
  if (!isNaN(parsedDateMilliseconds)) {
    // Return difference from reference time
    return parsedDateMilliseconds - referenceTime;
  }

  // Fallback value if parsing fails
  return t5A;
}

module.exports = parseTimestampOrDateDifference;