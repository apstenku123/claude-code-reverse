/**
 * Converts a given value to an ISO 8601 date string if possible.
 *
 * If the input is a Date instance, returns its ISO string representation.
 * If the input is a value that can be parsed into a valid Date, returns the ISO string of the parsed date.
 * If the input cannot be parsed into a valid Date, returns the string representation of the input.
 *
 * @param {any} value - The value to convert to an ISO date string. Can be a Date, a date string, or any value.
 * @returns {string} The ISO 8601 string representation of the date, or the stringified input if not a valid date.
 */
function formatDateToISOString(value) {
  // If the value is already a Date instance, return its ISO string
  if (value instanceof Date) {
    return value.toISOString();
  } else {
    // Try to create a Date from the input value
    const parsedDate = new Date(value);
    // Check if the parsed date is valid
    if (Number.isNaN(parsedDate.getTime())) {
      // If not a valid date, return the string representation of the input
      return String(value);
    } else {
      // If valid, return the ISO string
      return parsedDate.toISOString();
    }
  }
}

module.exports = formatDateToISOString;