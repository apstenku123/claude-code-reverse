/**
 * Generates a regular expression to match ISO-like date-time strings with optional timezone information.
 *
 * @param {Object} dateTimeOptions - Options describing the date-time format.
 * @param {boolean} dateTimeOptions.local - Indicates if the time is local (no offset).
 * @param {boolean} dateTimeOptions.offset - Indicates if the time includes an offset (e.g., +02:00).
 * @returns {RegExp} Regular expression to match the specified date-time format.
 */
function createIsoDateTimeRegex(dateTimeOptions) {
  // Compose the base pattern using external helpers pyA and getTimeRegexPattern
  const basePattern = `${pyA}BugReportForm${getTimeRegexPattern(dateTimeOptions)}`;

  // Build an array of timezone suffix patterns
  const timezonePatterns = [];

  // If local time, use 'zA?'; otherwise, use 'zA'
  timezonePatterns.push(dateTimeOptions.local ? "zA?" : "zA");

  // If an offset is present, add the offset pattern
  if (dateTimeOptions.offset) {
    timezonePatterns.push("([+-]\\d{2}:?\\d{2})");
  }

  // Combine the base pattern and timezone patterns into a full regex string
  const fullPattern = `${basePattern}(${timezonePatterns.join("|")})`;

  // Return a RegExp that matches the full pattern from start to end
  return new RegExp(`^${fullPattern}$`);
}

module.exports = createIsoDateTimeRegex;