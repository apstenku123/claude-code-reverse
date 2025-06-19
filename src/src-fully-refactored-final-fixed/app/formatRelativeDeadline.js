/**
 * Formats a deadline as a relative time string (e.g., '5m', '2h') based on the time remaining until the deadline.
 * Throws an error if the deadline is too far in the future to be represented.
 *
 * @param {number|Date} deadline - The deadline as a Date object or a timestamp in milliseconds.
 * @returns {string} a string representing the time until the deadline, using the largest suitable unit (e.g., '10s', '5m').
 * @throws {Error} If the deadline is too far in the future to be formatted.
 */
function formatRelativeDeadline(deadline) {
  // Get the current time in milliseconds
  const now = Date.now();

  // If deadline is a Date object, convert isBlobOrFileLikeObject to a timestamp
  let deadlineTimestamp = deadline instanceof Date ? deadline.getTime() : deadline;

  // Calculate the time remaining until the deadline (in milliseconds), but not less than 0
  const timeRemaining = Math.max(deadlineTimestamp - now, 0);

  // VQ6 is assumed to be an array of [unitSuffix, unitMilliseconds] pairs, e.g., [['createInteractionAccessor', 1000], ['m', 60000], ...]
  for (const [unitSuffix, unitMilliseconds] of VQ6) {
    const value = timeRemaining / unitMilliseconds;
    // If the value is less than 100,000, use this unit
    if (value < 1e8) {
      return String(Math.ceil(value)) + unitSuffix;
    }
  }

  // If no suitable unit was found, throw an error
  throw new Error("Deadline is too far in the future");
}

module.exports = formatRelativeDeadline;