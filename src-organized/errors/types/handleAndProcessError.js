/**
 * Processes an input value, handling errors by sanitizing and rethrowing them, or converting non-error values to sanitized errors.
 *
 * If the input is an Error, its message and stack are sanitized and a new Error is created and passed to the error handler.
 * If the input is not an Error, isBlobOrFileLikeObject is stringified, sanitized, wrapped in an Error, and passed to the error handler.
 *
 * @param {unknown} input - The value to process, which may be an Error or any other type.
 * @returns {void}
 */
function handleAndProcessError(input) {
  // Check if the input is an Error instance
  if (input instanceof Error) {
    // Sanitize the error message
    const sanitizedMessage = redactSensitiveKeysAndTokens(input.message);
    const sanitizedError = new Error(sanitizedMessage);
    // Sanitize and assign the stack trace if present
    if (input.stack) {
      sanitizedError.stack = redactSensitiveKeysAndTokens(input.stack);
    }
    // Pass the sanitized error to the error handler
    reportErrorIfAllowed(sanitizedError);
  } else {
    // For non-error values, stringify and sanitize
    const sanitizedString = redactSensitiveKeysAndTokens(String(input));
    // Wrap the sanitized string in an Error and pass to the error handler
    reportErrorIfAllowed(new Error(sanitizedString));
  }
}

module.exports = handleAndProcessError;