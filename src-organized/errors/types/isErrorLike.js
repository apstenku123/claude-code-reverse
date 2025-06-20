/**
 * Determines whether the provided value is an Error or behaves like an Error object.
 *
 * This function checks if the input is an instance of Error, or if its constructor name
 * is either 'Error' or 'DOMException'. This is useful for error handling when dealing
 * with objects that may not directly inherit from Error but are still error-like.
 *
 * @param {any} value - The value to check for error-like characteristics.
 * @returns {boolean} True if the value is an Error, or its constructor name is 'Error' or 'DOMException'; otherwise, false.
 */
function isErrorLike(value) {
  // Check if value is an instance of Error
  if (value instanceof Error) {
    return true;
  }

  // Check if value'createInteractionAccessor constructor name is 'Error' or 'DOMException'
  const constructorName = value?.constructor?.name;
  return constructorName === 'Error' || constructorName === 'DOMException';
}

module.exports = isErrorLike;
