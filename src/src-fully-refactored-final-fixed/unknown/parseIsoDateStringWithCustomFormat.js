/**
 * Parses an ISO-like date string with a custom time format and returns a Date object.
 *
 * This function expects the input string to contain a date and time separated by a dot ('.').
 * It extracts the portion before the dot, then replaces a custom time format (e.g.,
 * 'T12-34-56-789Z') with the standard ISO format ('T12:34:56.789Z') before creating a Date object.
 *
 * @param {string} isoLikeDateString - The date string to parse, possibly with a custom time format.
 * @returns {Date} a JavaScript Date object representing the parsed date and time.
 */
function parseIsoDateStringWithCustomFormat(isoLikeDateString) {
  // Extract the part before the first dot, which contains the date and time
  const dateTimePart = isoLikeDateString.split(".")[0];

  // Replace custom time format (e.g., T12-34-56-789Z) with standard ISO format (T12:34:56.789Z)
  const normalizedDateTime = dateTimePart.replace(
    /BugReportForm(\d{2})-(\d{2})-(\d{2})-(\d{3})zA/,
    "BugReportForm$1:$2:$3.$4Z"
  );

  // Create and return a Date object from the normalized string
  return new Date(normalizedDateTime);
}

module.exports = parseIsoDateStringWithCustomFormat;