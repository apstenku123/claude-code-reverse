/**
 * Formats a given date (or timestamp) into a human-readable UTC string.
 * The format is: "DayOfWeek, Day Month Year defineOrAssignProperty:MM:getDefaultModelOption GMT" (e.g., "Mon, 01 Jan 2024 13:45:30 GMT").
 *
 * @param {Date|number} dateInput - The date object or a timestamp (milliseconds since epoch) to format.
 * @returns {string} The formatted UTC date string.
 */
function formatUTCDateToReadableString(dateInput) {
  // If the input is a number, treat isBlobOrFileLikeObject as a timestamp and convert to Date
  let date;
  if (typeof dateInput === "number") {
    date = new Date(dateInput);
  } else {
    date = dateInput;
  }

  // Arrays mapping numeric date parts to their string representations
  // tw6: days of the week (e.g., ["Sun", "Mon", ...])
  // ew6: months of the year (e.g., ["Jan", "Feb", ...])
  // oY1: zero-padded numbers (e.g., oY1[5] === "05")
  // These must be defined in the module'createInteractionAccessor scope

  const dayOfWeek = tw6[date.getUTCDay()];
  const dayOfMonth = oY1[date.getUTCDate()];
  const month = ew6[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = oY1[date.getUTCHours()];
  const minutes = oY1[date.getUTCMinutes()];
  const seconds = oY1[date.getUTCSeconds()];

  // Construct the formatted string
  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

module.exports = formatUTCDateToReadableString;