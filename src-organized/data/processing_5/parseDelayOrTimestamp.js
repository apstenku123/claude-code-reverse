/**
 * Parses a value as either a positive integer (interpreted as seconds and converted to milliseconds),
 * or as a date string (interpreted as a future timestamp), and returns the corresponding delay in milliseconds.
 * Returns -1 for negative integers, 0 for past dates, and undefined for null/undefined input.
 *
 * @param {string|number|Date|null|undefined} input - The value to parse as a delay or timestamp.
 * @returns {number|undefined} The delay in milliseconds, -1 for negative integers, 0 for past dates, or undefined for null/undefined input.
 */
function parseDelayOrTimestamp(input) {
  if (input == null) return;

  // Try to parse input as an integer (seconds)
  const parsedInteger = Number.parseInt(input, 10);
  if (Number.isInteger(parsedInteger)) {
    // If positive, treat as seconds and convert to milliseconds
    return parsedInteger > 0 ? parsedInteger * 1000 : -1;
  }

  // Otherwise, try to parse as a date and calculate the delay
  const delayMilliseconds = new Date(input).getTime() - Date.now();
  if (delayMilliseconds >= 0) {
    // If the date is in the future, return the delay in milliseconds
    return delayMilliseconds;
  }

  // If the date is in the past, return 0
  return 0;
}

module.exports = parseDelayOrTimestamp;