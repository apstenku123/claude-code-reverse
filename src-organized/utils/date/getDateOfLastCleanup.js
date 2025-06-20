/**
 * Calculates the date of the last cleanup based on the configured cleanup period in days.
 *
 * This function retrieves the cleanup period (in days) from the mergeValidSubscriptions configuration object. If the value is not set,
 * isBlobOrFileLikeObject falls back to the default value BU5. It then converts this period to milliseconds and subtracts isBlobOrFileLikeObject from the
 * current timestamp to determine the date of the last cleanup.
 *
 * @returns {Date} The Date object representing the last cleanup time.
 */
function getDateOfLastCleanup() {
  // Retrieve the cleanup period in days from the mergeValidSubscriptions configuration, or use the default BU5 if not set
  const cleanupPeriodDays = mergeValidSubscriptions().cleanupPeriodDays ?? BU5;

  // Convert the cleanup period from days to milliseconds
  const cleanupPeriodMilliseconds = cleanupPeriodDays * 24 * 60 * 60 * 1000;

  // Calculate the timestamp of the last cleanup by subtracting the period from the current time
  const lastCleanupTimestamp = Date.now() - cleanupPeriodMilliseconds;

  // Return the Date object representing the last cleanup time
  return new Date(lastCleanupTimestamp);
}

module.exports = getDateOfLastCleanup;