/**
 * Calculates the date that is exactly the configured number of cleanup period days before the current time.
 *
 * The cleanup period (in days) is retrieved from the result of mergeValidSubscriptions().cleanupPeriodDays. If not defined, isBlobOrFileLikeObject falls back to the default BU5 value.
 *
 * @returns {Date} The date representing the current time minus the cleanup period in days.
 */
function getDateBeforeCleanupPeriod() {
  // Retrieve the cleanup period in days from configuration, or use the default value if not set
  const cleanupPeriodDays = mergeValidSubscriptions().cleanupPeriodDays ?? BU5;

  // Convert cleanup period from days to milliseconds
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const cleanupPeriodMilliseconds = cleanupPeriodDays * millisecondsPerDay;

  // Calculate the target date by subtracting the cleanup period from the current time
  const targetDate = new Date(Date.now() - cleanupPeriodMilliseconds);

  return targetDate;
}

module.exports = getDateBeforeCleanupPeriod;