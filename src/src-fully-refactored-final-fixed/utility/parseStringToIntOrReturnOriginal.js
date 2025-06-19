/**
 * Attempts to parse the input value as an integer. If parsing is successful and the result is a valid number,
 * returns the integer value. If parsing fails (result is NaN), returns the original input value unchanged.
 *
 * @param {string} value - The value to attempt to parse as an integer.
 * @returns {number|string} The parsed integer if successful, otherwise the original input value.
 */
function parseStringToIntOrReturnOriginal(value) {
  // Parse the input as an integer using base 10
  const parsedValue = parseInt(value, 10);
  // If parsing fails (result is NaN), return the original value; otherwise, return the parsed integer
  return isNaN(parsedValue) ? value : parsedValue;
}

module.exports = parseStringToIntOrReturnOriginal;