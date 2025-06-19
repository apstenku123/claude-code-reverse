/**
 * Returns the string representation of the input value, or an empty string if the input is null or undefined.
 *
 * @param {any} value - The value to convert to a string.
 * @returns {string} The string representation of the input, or an empty string if input is null/undefined.
 */
function getStringOrEmpty(value) {
  // If value is null or undefined, return an empty string
  if (value == null) {
    return "";
  }
  // Otherwise, convert the value to a string using markLanesAsSuspendedAndResetExpiration utility
  return markLanesAsSuspendedAndResetExpiration(value);
}

module.exports = getStringOrEmpty;