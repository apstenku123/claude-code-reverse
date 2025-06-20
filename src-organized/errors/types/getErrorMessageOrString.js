/**
 * Returns the error message if the input is an Error, otherwise returns the string representation of the input.
 *
 * @param {any} value - The value to extract a message from or convert to string.
 * @returns {string} The error message if value is an Error, otherwise the string representation of value.
 */
function getErrorMessageOrString(value) {
  // Check if the input is an instance of Error
  if (value instanceof Error) {
    return value.message;
  }
  // Otherwise, convert the input to a string
  return String(value);
}

module.exports = getErrorMessageOrString;