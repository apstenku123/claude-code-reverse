/**
 * Formats a given date/time relative to a reference date/time (defaults to now).
 * Delegates formatting to the external formatRelativeTime function, passing appropriate options.
 * If the target date is in the future, calls formatRelativeTime with the provided options.
 * If the target date is now or in the past, forces numeric formatting.
 *
 * @param {Date} targetDate - The date/time to format relative to the reference date.
 * @param {Object} [options={}] - Optional configuration for formatting.
 * @param {Date} [options.now=new Date()] - The reference date/time to compare against.
 * @returns {*} The formatted relative time string or value as returned by formatRelativeTime.
 */
function formatRelativeTime(targetDate, options = {}) {
  // Destructure 'now' from options, defaulting to current date/time, and collect the rest
  const {
    now: referenceDate = new Date(),
    ...otherOptions
  } = options;

  // If the target date is in the future relative to the reference date
  if (targetDate > referenceDate) {
    return formatRelativeTime(targetDate, {
      ...otherOptions,
      now: referenceDate
    });
  }

  // If the target date is now or in the past, enforce numeric formatting
  return formatRelativeTime(targetDate, {
    ...otherOptions,
    numeric: "always",
    now: referenceDate
  });
}

module.exports = formatRelativeTime;