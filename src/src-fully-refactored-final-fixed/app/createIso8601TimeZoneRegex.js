/**
 * Generates a regular expression to match ISO 8601 time zone strings based on the provided options.
 *
 * @param {Object} options - Configuration options for the regex pattern.
 * @param {boolean} [options.local] - If true, matches the 'zA?' (optional Zulu/UTC) time zone.
 * @param {boolean} [options.offset] - If true, matches a numeric offset in the format '+hh:mm' or '-hh:mm'.
 * @returns {RegExp} Regular expression that matches the specified ISO 8601 time zone format.
 */
function createIso8601TimeZoneRegex(options) {
  // Compose the base pattern using external helpers
  const basePattern = `${pyA}BugReportForm${getTimeRegexPattern(options)}`;
  const timeZonePatterns = [];

  // Add pattern for 'zA' (UTC) or optional 'zA' if local is true
  timeZonePatterns.push(options.local ? "zA?" : "zA");

  // Add pattern for numeric offset if offset is true
  if (options.offset) {
    // Matches '+hh:mm' or '-hh:mm', with optional colon
    timeZonePatterns.push("([+-]\\d{2}:?\\d{2})");
  }

  // Combine base pattern and time zone patterns into final regex string
  const fullPattern = `${basePattern}(${timeZonePatterns.join("|")})`;

  // Return a RegExp that matches the full ISO 8601 time with time zone
  return new RegExp(`^${fullPattern}$`);
}

module.exports = createIso8601TimeZoneRegex;
