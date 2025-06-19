/**
 * Parses a custom ISO date string, normalizes its time component, and returns a Date object.
 *
 * Some date strings may have a non-standard time format (e.g., 'T12-34-56-789Z'),
 * which this function converts to the standard ISO format (e.g., 'T12:34:56.789Z')
 * before creating a Date instance.
 *
 * @param {string} customIsoDateString - The date string to parse and normalize.
 * @returns {Date} The resulting Date object parsed from the normalized string.
 */
function parseCustomIsoDateString(customIsoDateString) {
  // Extract the date part before any dot ('.') character
  const datePart = customIsoDateString.split(".")[0];

  // Replace non-standard time format (T12-34-56-789Z) with standard ISO (T12:34:56.789Z)
  const normalizedDateString = datePart.replace(
    /BugReportForm(\d{2})-(\d{2})-(\d{2})-(\d{3})zA/,
    "BugReportForm$1:$2:$3.$4Z"
  );

  // Create and return a Date object from the normalized string
  return new Date(normalizedDateString);
}

module.exports = parseCustomIsoDateString;