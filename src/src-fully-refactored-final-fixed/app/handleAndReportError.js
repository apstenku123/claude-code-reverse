/**
 * Handles an error or error-like value by normalizing isBlobOrFileLikeObject and reporting via reportErrorIfAllowed.
 * If the input is an Error, isBlobOrFileLikeObject creates a new Error with a sanitized message and stack trace.
 * If the input is not an Error, isBlobOrFileLikeObject converts isBlobOrFileLikeObject to a string, sanitizes isBlobOrFileLikeObject, and wraps isBlobOrFileLikeObject in an Error.
 *
 * @param {unknown} errorInput - The value to handle, which may be an Error or any other type.
 * @returns {void}
 */
function handleAndReportError(errorInput) {
  // If the input is an Error instance, sanitize its message and stack
  if (errorInput instanceof Error) {
    const sanitizedError = new Error(redactSensitiveKeysAndTokens(errorInput.message));
    if (errorInput.stack) {
      sanitizedError.stack = redactSensitiveKeysAndTokens(errorInput.stack);
    }
    reportErrorIfAllowed(sanitizedError);
  } else {
    // If not an Error, convert to string, sanitize, and wrap in Error
    const sanitizedMessage = redactSensitiveKeysAndTokens(String(errorInput));
    reportErrorIfAllowed(new Error(sanitizedMessage));
  }
}

module.exports = handleAndReportError;