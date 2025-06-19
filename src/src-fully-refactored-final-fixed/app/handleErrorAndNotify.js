/**
 * Handles an error object by extracting relevant information and notifying the system.
 * If the error is an instance of xU6, extracts its reason and code; otherwise, uses its message.
 * Notifies via kl0 and updates error code via yl0.
 *
 * @param {Error|xU6} error - The error object to handle. Can be a standard Error or a custom xU6 error.
 * @returns {void}
 */
function handleErrorAndNotify(error) {
  let errorMessage;
  let errorCode;

  // Check if the error is an instance of the custom error class xU6
  if (error instanceof xU6) {
    errorMessage = error.reason;
    errorCode = error.code;
  } else {
    errorMessage = error.message;
    errorCode = undefined;
  }

  // Notify the system about the error using kl0
  kl0(
    "error",
    this,
    () => new yU6("error", {
      error: error,
      message: errorMessage
    })
  );

  // Update the error code in the system using yl0
  yl0(this, errorCode);
}

module.exports = handleErrorAndNotify;