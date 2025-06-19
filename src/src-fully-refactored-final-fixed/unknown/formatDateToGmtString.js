/**
 * Formats a given Date object into a human-readable GMT string.
 * Example output: "Sun, 07 Jan 2024 05:09:03 GMT"
 *
 * @param {Date} date - The Date object to format (in UTC).
 * @returns {string} The formatted GMT date string.
 */
function formatDateToGmtString(date) {
  // Arrays mapping day and month indexes to their string representations
  // lG4: Array of weekday names, e.g., ['Sun', 'Mon', ...]
  // PS1: Array of month names, e.g., ['Jan', 'Feb', ...]
  // These must be defined in the module'createInteractionAccessor scope
  
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth(); // 0-11
  const dayOfWeekIndex = date.getUTCDay(); // 0-6
  const dayOfMonth = date.getUTCDate(); // 1-31
  const hours = date.getUTCHours(); // 0-23
  const minutes = date.getUTCMinutes(); // 0-59
  const seconds = date.getUTCSeconds(); // 0-59

  // Pad single-digit day, hour, minute, and second values with leading zeros
  const paddedDayOfMonth = dayOfMonth < 10 ? `0${dayOfMonth}` : `${dayOfMonth}`;
  const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // Format: "DayOfWeek, createAccessorFunctionProxy Month YYYY defineOrAssignProperty:MM:getDefaultModelOption GMT"
  return `${lG4[dayOfWeekIndex]}, ${paddedDayOfMonth} ${PS1[monthIndex]} ${year} ${paddedHours}:${paddedMinutes}:${paddedSeconds} GMT`;
}

module.exports = formatDateToGmtString;