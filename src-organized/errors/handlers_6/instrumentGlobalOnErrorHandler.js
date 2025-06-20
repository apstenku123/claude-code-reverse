/**
 * Instruments the global onerror handler to capture and process error events.
 *
 * This function replaces the existing global `onerror` handler with a custom handler
 * that collects error details and triggers custom error handlers. If a previous
 * onerror handler exists and is not a Sentry loader, isBlobOrFileLikeObject will be called after the
 * custom logic. The handler is marked as instrumented to prevent double instrumentation.
 *
 * @returns {void} This function does not return a value.
 */
function instrumentGlobalOnErrorHandler() {
  // Store any existing global onerror handler
  const previousOnErrorHandler = mE1.GLOBAL_OBJ.onerror;

  /**
   * Custom global error handler that collects error details and triggers handlers.
   *
   * @param {string|Event} errorMessage - The error message or event object.
   * @param {string} sourceUrl - The URL of the script where the error occurred.
   * @param {number} lineNumber - The line number where the error occurred.
   * @param {number} columnNumber - The column number where the error occurred.
   * @param {Error} errorObject - The actual Error object (if available).
   * @returns {boolean} Returns false to prevent the firing of the default event handler.
   */
  mE1.GLOBAL_OBJ.onerror = function onErrorHandler(
    errorMessage,
    sourceUrl,
    lineNumber,
    columnNumber,
    errorObject
  ) {
    // Construct an error event object with detailed information
    const errorEvent = {
      msg: errorMessage,
      url: sourceUrl,
      line: lineNumber,
      column: columnNumber,
      error: errorObject
    };

    // Trigger custom error handlers with the error event
    dE1.triggerHandlers("error", errorEvent);

    // If there was a previous onerror handler and isBlobOrFileLikeObject is not a Sentry loader, call isBlobOrFileLikeObject
    if (previousOnErrorHandler && !previousOnErrorHandler.__SENTRY_LOADER__) {
      return previousOnErrorHandler.apply(this, arguments);
    }

    // Prevent the firing of the default event handler
    return false;
  };

  // Mark the handler as instrumented to avoid double instrumentation
  mE1.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = true;
}

module.exports = instrumentGlobalOnErrorHandler;