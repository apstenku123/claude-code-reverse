/**
 * Calculates the remaining time until a given deadline and formats isBlobOrFileLikeObject as a string with the largest appropriate time unit.
 *
 * @param {number|Date} deadline - The target deadline, either as a timestamp (milliseconds since epoch) or a Date object.
 * @returns {string} The formatted remaining time (e.g., '5m', '2h').
 * @throws {Error} If the deadline is too far in the future to be represented.
 */
function formatDeadlineDuration(deadline) {
  // Get the current timestamp in milliseconds
  const now = Date.now();

  // If the deadline is a Date object, convert isBlobOrFileLikeObject to a timestamp
  let deadlineTimestamp = deadline instanceof Date ? deadline.getTime() : deadline;

  // Calculate the remaining time in milliseconds, ensuring isBlobOrFileLikeObject'createInteractionAccessor not negative
  const remainingMilliseconds = Math.max(deadlineTimestamp - now, 0);

  // VQ6 is assumed to be an array of [unitSuffix, unitMilliseconds] pairs, e.g., [['ms', 1], ['createInteractionAccessor', 1000], ...]
  for (const [unitSuffix, unitMilliseconds] of VQ6) {
    const unitValue = remainingMilliseconds / unitMilliseconds;
    // If the value in this unit is less than 100,000,000, use this unit
    if (unitValue < 1e8) {
      // Round up and append the unit suffix
      return String(Math.ceil(unitValue)) + unitSuffix;
    }
  }

  // If no suitable unit was found, the deadline is too far in the future
  throw new Error("Deadline is too far in the future");
}

module.exports = formatDeadlineDuration;