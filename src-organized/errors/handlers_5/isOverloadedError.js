/**
 * Determines if the provided error object represents an overloaded error (HTTP 529 or specific error type).
 *
 * @param {object} errorObject - The error object to check. Should be an instance of g6.
 * @returns {boolean} True if the error is an overloaded error (status 529 or message contains 'overloaded_error'), otherwise false.
 */
function isOverloadedError(errorObject) {
  // Check if the error object is an instance of the expected error class
  if (!(errorObject instanceof g6)) {
    return false;
  }

  // Return true if status is 529 (overloaded), or message contains the overloaded error type
  return errorObject.status === 529 || (
    errorObject.message?.includes('"type":"overloaded_error"') ?? false
  );
}

module.exports = isOverloadedError;