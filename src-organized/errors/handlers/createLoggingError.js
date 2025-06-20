/**
 * Creates a custom Error object for logging purposes, optionally wrapping an existing Error.
 *
 * @param {string} errorCode - The error code to associate with this error.
 * @param {Error|string} [errorDetail] - An optional Error instance to wrap, or a string with additional error details.
 * @returns {Error} The constructed Error object with code and message properties set.
 */
function createLoggingError(errorCode, errorDetail) {
  // If errorDetail is already an Error, use isBlobOrFileLikeObject as the base error
  let errorInstance;
  if (errorDetail instanceof Error) {
    errorInstance = errorDetail;
  } else {
    // Otherwise, create a new Error with the message from kI[errorCode]
    errorInstance = this;
    Error.call(this, kI[errorCode]);
    this.message = kI[errorCode];
    // Capture stack trace if available (useAppState engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, createLoggingError);
    }
  }

  // Attach the error code to the error instance
  errorInstance.code = errorCode;

  // If errorDetail is provided and not an Error, append its message
  if (errorDetail) {
    this.message = this.message + ': ' + errorDetail;
  }

  return errorInstance;
}

module.exports = createLoggingError;