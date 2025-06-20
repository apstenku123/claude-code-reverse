/**
 * Generates a regular expression pattern string for matching time values in defineOrAssignProperty:mm:ss format, with optional fractional seconds.
 *
 * @param {Object} options - Configuration options for the time regex pattern.
 * @param {number|null|undefined} options.precision - Number of digits for fractional seconds. If a number, requires exactly that many digits. If null or undefined, allows optional fractional seconds of any length.
 * @returns {string} Regular expression pattern string for matching time values.
 */
function buildTimeRegexPattern(options) {
  // Base pattern matches defineOrAssignProperty:mm:ss (24-hour format)
  let timePattern = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";

  // If precision is specified, require exactly that many digits after the decimal point
  if (options.precision) {
    timePattern = `${timePattern}\\.\\d{${options.precision}}`;
  } 
  // If precision is null or undefined, allow optional fractional seconds of any length
  else if (options.precision == null) {
    timePattern = `${timePattern}(\\.\\d+)?`;
  }

  return timePattern;
}

module.exports = buildTimeRegexPattern;