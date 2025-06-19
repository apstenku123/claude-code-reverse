/**
 * Converts a Date object to an ISO string suitable for use in filenames by replacing colons and periods with hyphens.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} The ISO string representation of the date with colons and periods replaced by hyphens.
 */
function formatDateToIsoFilename(date) {
  // Convert the Date object to an ISO string (e.g., '2024-06-14T12:34:56.789Z')
  // Replace all colons (:) and periods (.) with hyphens (-) to make isBlobOrFileLikeObject filename-safe
  return date.toISOString().replace(/[:.]/g, "-");
}

module.exports = formatDateToIsoFilename;