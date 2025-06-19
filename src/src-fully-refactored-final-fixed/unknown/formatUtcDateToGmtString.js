/**
 * Formats a given date (or timestamp) into a human-readable GMT string.
 *
 * The format is: "DayOfWeek, Day Month Year defineOrAssignProperty:MM:getDefaultModelOption GMT"
 * Example: "Mon, 01 Jan 2024 13:05:09 GMT"
 *
 * @param {Date|number} dateInput - The date object or a timestamp (milliseconds since epoch) to format.
 * @returns {string} The formatted GMT date string.
 */
function formatUtcDateToGmtString(dateInput) {
  // If input is a timestamp (number), convert to Date object
  let date;
  if (typeof dateInput === "number") {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  // Arrays for day names, month names, and zero-padded numbers (assumed to be defined elsewhere)
  // tw6: Array of weekday names, e.g., ["Sun", "Mon", ...]
  // ew6: Array of month names, e.g., ["Jan", "Feb", ...]
  // oY1: Function or array for zero-padding numbers, e.g., (n) => n.toString().padStart(2, '0')

  const dayOfWeek = tw6[date.getUTCDay()];
  const dayOfMonth = oY1[date.getUTCDate()];
  const month = ew6[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = oY1[date.getUTCHours()];
  const minutes = oY1[date.getUTCMinutes()];
  const seconds = oY1[date.getUTCSeconds()];

  // Construct the formatted GMT string
  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

module.exports = formatUtcDateToGmtString;