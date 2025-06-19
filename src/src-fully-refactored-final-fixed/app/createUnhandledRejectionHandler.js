/**
 * Creates a handler for unhandled promise rejections that captures exceptions
 * only for a specific client, and then performs additional error processing.
 *
 * @param {string} expectedClient - The client identifier to match against the current client.
 * @param {object} errorProcessingConfig - Configuration object passed to the error processing function.
 * @returns {function} Handler function for unhandled promise rejections.
 */
function createUnhandledRejectionHandler(expectedClient, errorProcessingConfig) {
  /**
   * Handles unhandled promise rejections by capturing the exception and performing additional processing.
   *
   * @param {Error} rejectionReason - The reason the promise was rejected (the error object).
   * @param {any} originalException - The original exception object, if available.
   */
  return function handleUnhandledRejection(rejectionReason, originalException) {
    // Only handle the rejection if the current client matches the expected client
    if (o91.getClient() !== expectedClient) return;

    // Capture the exception with additional context about the unhandled rejection
    o91.captureException(rejectionReason, {
      originalException: originalException,
      captureContext: {
        extra: {
          unhandledPromiseRejection: true
        }
      },
      mechanism: {
        handled: false,
        type: "onunhandledrejection"
      }
    });

    // Perform additional error processing with the provided configuration
    GI9(rejectionReason, errorProcessingConfig);
  };
}

module.exports = createUnhandledRejectionHandler;