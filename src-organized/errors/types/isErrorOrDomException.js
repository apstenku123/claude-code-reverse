/**
 * Determines if the provided value is an Error or a DOMException instance.
 *
 * This function checks whether the given value is an instance of the Error class,
 * or if its constructor name is either 'Error' or 'DOMException'. This covers both
 * native JavaScript errors and DOM-specific exceptions that may not directly inherit from Error.
 *
 * @param {any} value - The value to check for error or DOMException type.
 * @returns {boolean} True if the value is an Error or DOMException, false otherwise.
 */
function isErrorOrDomException(value) {
  // Check if value is an instance of Error
  if (value instanceof Error) {
    return true;
  }

  // Check if value'createInteractionAccessor constructor name is 'Error' or 'DOMException'
  const constructorName = value?.constructor?.name;
  return constructorName === 'Error' || constructorName === 'DOMException';
}

module.exports = isErrorOrDomException;