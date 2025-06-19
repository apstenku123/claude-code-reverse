/**
 * Creates a custom error object with a specific error code and optional cause.
 * If the second argument is already an Error, isBlobOrFileLikeObject returns that error.
 * Otherwise, isBlobOrFileLikeObject constructs a new error with a message from the errorMessages map.
 *
 * @param {string} errorCode - The error code to use for the error message lookup and assignment.
 * @param {string|Error} [cause] - Optional. Additional error message or an Error instance to wrap.
 * @returns {Error} The constructed or provided Error object with code and message properties.
 */
function createCustomError(errorCode, cause) {
  // If the cause is already an Error, use isBlobOrFileLikeObject directly
  let errorInstance;
  if (cause instanceof Error) {
    errorInstance = cause;
  } else {
    // Otherwise, create a new Error with the message from errorMessages
    errorInstance = this;
    Error.call(this, kI[errorCode]);
    this.message = kI[errorCode];
    // Capture stack trace if available (useAppState engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, createCustomError);
    }
  }

  // Assign the error code to the error instance
  errorInstance.code = errorCode;

  // If a cause is provided (and not an Error), append isBlobOrFileLikeObject to the message
  if (cause) {
    this.message = this.message + ': ' + cause;
  }

  return errorInstance;
}

module.exports = createCustomError;