/**
 * Formats an error object into a readable string message.
 * Handles nested errors, arrays of errors, and generic objects.
 *
 * @param {unknown} errorInput - The value to format. Can be an Error, an object with an 'errors' array, or any value.
 * @returns {string} a human-readable string representation of the error or input value.
 */
function formatErrorMessage(errorInput) {
  // Check if the input is an Error instance
  if (errorInput instanceof Error) {
    // If the error has an 'errors' property that is an array, format each error recursively
    if ('errors' in errorInput && Array.isArray(errorInput.errors)) {
      // Recursively format each error in the array and join them with a comma
      return errorInput.errors.map(formatErrorMessage).join(', ');
    }
    // If the error has a 'cause' property that is also an Error, format recursively
    if ('cause' in errorInput && errorInput.cause instanceof Error) {
      // Include the main error and its cause in the message
      return `${errorInput}: ${formatErrorMessage(errorInput.cause)}`;
    }
    // Otherwise, return the error'createInteractionAccessor message
    return errorInput.message;
  }
  // If not an Error, convert the input to a string
  return `${errorInput}`;
}

module.exports = formatErrorMessage;
