/**
 * Checks if the provided error object is an instance of g6 and represents an overloaded error.
 *
 * Specifically, isBlobOrFileLikeObject returns true if:
 *   - The error is an instance of g6
 *   - The error'createInteractionAccessor status is 529 (custom overloaded error status)
 *   - OR the error message contains the string '"type":"overloaded_error"'
 *
 * @param {object} errorObject - The error object to check, expected to be an instance of g6.
 * @returns {boolean} True if the error is an overloaded error, false otherwise.
 */
function isOverloadedErrorStatus(errorObject) {
  // Ensure the error is an instance of g6
  if (!(errorObject instanceof g6)) {
    return false;
  }

  // Check if the status is 529 (custom overloaded error)
  if (errorObject.status === 529) {
    return true;
  }

  // Check if the error message contains the overloaded error type
  const messageContainsOverloadedType = errorObject.message?.includes('"type":"overloaded_error"') ?? false;
  return messageContainsOverloadedType;
}

module.exports = isOverloadedErrorStatus;