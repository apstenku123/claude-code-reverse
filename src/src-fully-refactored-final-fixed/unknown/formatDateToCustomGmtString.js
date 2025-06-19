/**
 * Formats a given date (or timestamp) into a custom GMT string.
 * The output format is: "<DayName>, <DayNumber> <MonthName> <Year> <Hour>:<Minute>:<Second> GMT"
 * Day names, month names, and zero-padded numbers are provided by external arrays/functions.
 *
 * @param {Date|number} dateInput - The date object or timestamp to format.
 * @returns {string} The formatted GMT date string.
 */
function formatDateToCustomGmtString(dateInput) {
  // If the input is a timestamp (number), convert isBlobOrFileLikeObject to a Date object
  let dateObject = dateInput;
  if (typeof dateInput === "number") {
    dateObject = new Date(dateInput);
  }

  // Get the day of the week (0-6), day of the month (1-31), month (0-11), year, hours, minutes, seconds
  const dayOfWeekIndex = dateObject.getUTCDay();
  const dayOfMonth = dateObject.getUTCDate();
  const monthIndex = dateObject.getUTCMonth();
  const year = dateObject.getUTCFullYear();
  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();
  const seconds = dateObject.getUTCSeconds();

  // tw6: array of day names (e.g., ['Sun', 'Mon', ...])
  // ew6: array of month names (e.g., ['Jan', 'Feb', ...])
  // oY1: function or array for zero-padded numbers (e.g., oY1[5] === '05')
  // These are assumed to be defined in the external context

  const dayName = tw6[dayOfWeekIndex];
  const dayNumber = oY1[dayOfMonth];
  const monthName = ew6[monthIndex];
  const hourString = oY1[hours];
  const minuteString = oY1[minutes];
  const secondString = oY1[seconds];

  // Construct the formatted string
  return `${dayName}, ${dayNumber} ${monthName} ${year} ${hourString}:${minuteString}:${secondString} GMT`;
}

module.exports = formatDateToCustomGmtString;