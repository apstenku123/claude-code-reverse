/**
 * Handles an error event by extracting relevant error information and triggering logging and notification mechanisms.
 *
 * @param {Error|xU6} errorInstance - The error object to process. Can be a standard Error or a custom xU6 error.
 * @returns {void}
 *
 * If the error is an instance of xU6, extracts its reason and code. Otherwise, uses the message property.
 * Triggers kl0 to log the error and yl0 to notify with the error code (if available).
 */
function handleErrorEvent(errorInstance) {
  let errorMessage;
  let errorCode;

  // Check if the error is a custom xU6 error type
  if (errorInstance instanceof xU6) {
    errorMessage = errorInstance.reason;
    errorCode = errorInstance.code;
  } else {
    // Fallback to standard error message
    errorMessage = errorInstance.message;
    errorCode = undefined;
  }

  // Log the error using kl0, passing a new yU6 error object
  kl0(
    "error",
    this,
    () => new yU6("error", {
      error: errorInstance,
      message: errorMessage
    })
  );

  // Notify with the error code (if available)
  yl0(this, errorCode);
}

module.exports = handleErrorEvent;