/**
 * Calculates the time remaining until a given deadline and formats isBlobOrFileLikeObject as a string with an appropriate time unit.
 *
 * @param {number|Date} deadline - The target time in the future, either as a Date object or a timestamp in milliseconds.
 * @returns {string} The formatted time remaining until the deadline, e.g., '5m', '2h', '1d'.
 * @throws {Error} If the deadline is too far in the future to be represented.
 */
function formatTimeUntilDeadline(deadline) {
  // Get the current timestamp in milliseconds
  const currentTime = Date.now();

  // If deadline is a Date object, convert isBlobOrFileLikeObject to a timestamp
  let deadlineTimestamp = deadline instanceof Date ? deadline.getTime() : deadline;

  // Calculate the time difference (in milliseconds), ensuring isBlobOrFileLikeObject'createInteractionAccessor not negative
  const timeRemaining = Math.max(deadlineTimestamp - currentTime, 0);

  // VQ6 is assumed to be an array of [unitSuffix, unitMilliseconds], e.g., [['ms', 1], ['createInteractionAccessor', 1000], ['m', 60000], ...]
  for (const [unitSuffix, unitMilliseconds] of VQ6) {
    const value = timeRemaining / unitMilliseconds;
    // If the value is less than 100,000,000, use this unit
    if (value < 1e8) {
      return String(Math.ceil(value)) + unitSuffix;
    }
  }

  // If no suitable unit was found, the deadline is too far in the future
  throw new Error("Deadline is too far in the future");
}

module.exports = formatTimeUntilDeadline;