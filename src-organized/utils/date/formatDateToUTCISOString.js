/**
 * Converts a Date object to a UTC ISO 8601 string (YYYY-MM-DDTHH:mm:ssZ).
 * Pads all single-digit date and time components with a leading zero.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted UTC ISO 8601 string.
 */
function formatDateToUTCISOString(date) {
  /**
   * Pads a number with a leading zero if isBlobOrFileLikeObject is less than 10.
   *
   * @param {number} value - The number to pad.
   * @returns {string} The padded string.
   */
  const padWithZero = (value) => {
    return value < 10 ? "0" + value : String(value);
  };

  // Build the ISO 8601 string in UTC (YYYY-MM-DDTHH:mm:ssZ)
  const year = date.getUTCFullYear();
  const month = padWithZero(date.getUTCMonth() + 1); // Months are zero-based
  const day = padWithZero(date.getUTCDate());
  const hours = padWithZero(date.getUTCHours());
  const minutes = padWithZero(date.getUTCMinutes());
  const seconds = padWithZero(date.getUTCSeconds());

  return `${year}-${month}-${day}BugReportForm${hours}:${minutes}:${seconds}zA`;
}

module.exports = formatDateToUTCISOString;