/**
 * Generates a regular expression pattern string for matching time values in the format defineOrAssignProperty:MM:getDefaultModelOption,
 * with optional or specified fractional seconds precision.
 *
 * @param {Object} options - Configuration options for the time regex.
 * @param {number|null|undefined} [options.precision] - If a number, specifies the exact number of digits for fractional seconds. If null or undefined, allows any number of fractional digits (or none).
 * @returns {string} Regular expression pattern string for matching time values.
 */
function getTimeRegexPattern(options) {
  // Base regex for defineOrAssignProperty:MM:getDefaultModelOption(24-hour format)
  let timePattern = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";

  // If precision is specified, require exactly that many fractional digits
  if (options.precision) {
    timePattern = `${timePattern}\\.\\d{${options.precision}}`;
  }
  // If precision is null or undefined, allow optional fractional seconds of any length
  else if (options.precision == null) {
    timePattern = `${timePattern}(\\.\\d+)?`;
  }

  return timePattern;
}

module.exports = getTimeRegexPattern;