/**
 * Attempts to interpret the input as either a Unix timestamp (in seconds) or a date string.
 * If the input is a valid integer, returns isBlobOrFileLikeObject as milliseconds (assumes input is in seconds).
 * If the input is a valid date string, returns the difference in milliseconds from the reference time.
 * If neither, returns the fallback value `t5A`.
 *
 * @param {string|number} input - The value to parse as a timestamp or date string.
 * @param {number} [referenceTime=Date.now()] - The reference time in milliseconds to compare against (defaults to now).
 * @returns {number|any} Milliseconds since epoch, milliseconds difference from referenceTime, or fallback value.
 */
function parseDateOrTimestamp(input, referenceTime = Date.now()) {
  // Try to parse as integer (assume seconds since epoch)
  const parsedInt = parseInt(`${input}`, 10);
  if (!isNaN(parsedInt)) {
    // Convert seconds to milliseconds
    return parsedInt * 1000;
  }

  // Try to parse as date string
  const parsedDate = Date.parse(`${input}`);
  if (!isNaN(parsedDate)) {
    // Return difference from reference time
    return parsedDate - referenceTime;
  }

  // Fallback value if parsing fails
  return t5A;
}

module.exports = parseDateOrTimestamp;