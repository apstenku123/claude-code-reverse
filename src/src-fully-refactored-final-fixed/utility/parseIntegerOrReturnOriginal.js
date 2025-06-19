/**
 * Attempts to parse the input value as an integer. If parsing fails (i.e., the input is not a valid integer),
 * returns the original input value unchanged.
 *
 * @param {string} value - The value to attempt to parse as an integer.
 * @returns {number|string} The parsed integer if successful; otherwise, the original input value.
 */
function parseIntegerOrReturnOriginal(value) {
  // Parse the input as an integer using base 10
  const parsedInteger = parseInt(value, 10);
  // If parsing results in NaN, return the original value; otherwise, return the parsed integer
  return isNaN(parsedInteger) ? value : parsedInteger;
}

module.exports = parseIntegerOrReturnOriginal;