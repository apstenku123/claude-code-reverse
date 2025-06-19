/**
 * Returns a string representation of the input value, or an empty string if the value is null or undefined.
 *
 * @param {any} value - The value to be converted to a string.
 * @returns {string} The string representation of the value, or an empty string if the value is null or undefined.
 */
function getStringValueOrEmpty(value) {
  // If the value is null or undefined, return an empty string
  if (value == null) {
    return "";
  }
  // Otherwise, convert the value to a string using markLanesAsSuspendedAndResetExpiration
  return markLanesAsSuspendedAndResetExpiration(value);
}

module.exports = getStringValueOrEmpty;