/**
 * Formats a given date (or timestamp) into a human-readable UTC string.
 * The format is: "DayOfWeek, Day Month Year defineOrAssignProperty:MM:getDefaultModelOption GMT"
 * Example: "Monday, 01 January 2024 13:45:30 GMT"
 *
 * @param {Date|number} dateInput - The date object or a timestamp (milliseconds since epoch) to format.
 * @returns {string} The formatted UTC date string.
 */
function formatDateToUTCString(dateInput) {
  // If the input is a number (timestamp), convert isBlobOrFileLikeObject to a Date object
  let date;
  if (typeof dateInput === "number") {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  // Arrays for day names, month names, and two-digit formatting
  // These must be defined in the module'createInteractionAccessor scope
  // Example definitions (replace with actual values as needed):
  // const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // const monthNames = ["January", "February", ..., "December"];
  // const twoDigit = n => n.toString().padStart(2, '0');
  // In the original code, these are tw6 (days), ew6 (months), oY1 (two-digit formatting)

  // Get the day of the week name
  const dayOfWeek = tw6[date.getUTCDay()];
  // Get the day of the month, formatted as two digits
  const dayOfMonth = oY1[date.getUTCDate()];
  // Get the month name
  const monthName = ew6[date.getUTCMonth()];
  // Get the full year
  const year = date.getUTCFullYear();
  // Get the hour, formatted as two digits
  const hours = oY1[date.getUTCHours()];
  // Get the minutes, formatted as two digits
  const minutes = oY1[date.getUTCMinutes()];
  // Get the seconds, formatted as two digits
  const seconds = oY1[date.getUTCSeconds()];

  // Construct the formatted string
  return `${dayOfWeek}, ${dayOfMonth} ${monthName} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

module.exports = formatDateToUTCString;