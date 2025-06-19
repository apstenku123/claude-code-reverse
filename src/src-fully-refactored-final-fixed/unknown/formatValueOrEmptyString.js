/**
 * Returns a formatted string representation of the input value, or an empty string if the value is null or undefined.
 *
 * @param {any} value - The value to format. If null or undefined, an empty string is returned.
 * @returns {string} The formatted string or an empty string if the input is null/undefined.
 */
function formatValueOrEmptyString(value) {
  // If the value is null or undefined, return an empty string
  if (value == null) {
    return "";
  }
  // Otherwise, format the value using the external markLanesAsSuspendedAndResetExpiration function
  return markLanesAsSuspendedAndResetExpiration(value);
}

module.exports = formatValueOrEmptyString;