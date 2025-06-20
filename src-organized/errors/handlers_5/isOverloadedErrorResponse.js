/**
 * Determines if the provided object is an overloaded error response.
 *
 * This function checks whether the given object is an instance of the g6 error class, and then verifies
 * if isBlobOrFileLikeObject represents an overloaded error condition. It does so by checking if the status property is 529
 * (commonly used for 'overloaded' or 'site is overloaded' errors), or if the message property contains
 * the string '"type":"overloaded_error"'.
 *
 * @param {object} errorResponse - The object to check, expected to be an error response.
 * @returns {boolean} True if the object is an overloaded error response, otherwise false.
 */
function isOverloadedErrorResponse(errorResponse) {
  // Ensure the object is an instance of the expected error class
  if (!(errorResponse instanceof g6)) {
    return false;
  }

  // Check if the status code indicates an overloaded error
  if (errorResponse.status === 529) {
    return true;
  }

  // Check if the error message contains the overloaded error type
  const messageContainsOverloadedError = errorResponse.message?.includes('"type":"overloaded_error"') ?? false;
  return messageContainsOverloadedError;
}

module.exports = isOverloadedErrorResponse;