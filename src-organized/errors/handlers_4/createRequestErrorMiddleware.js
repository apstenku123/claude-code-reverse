/**
 * Middleware factory for handling errors in network requests and reporting them to Sentry.
 *
 * @param {Object} [errorHandlerConfig] - Optional configuration object that may contain a shouldHandleError function.
 * @returns {Function} Middleware function to handle errors in network requests.
 */
function createRequestErrorMiddleware(errorHandlerConfig) {
  /**
   * Handles errors from network requests, reports them to Sentry, and manages session state.
   *
   * @param {Error} error - The error object thrown during the request.
   * @param {Object} request - The request object associated with the network call.
   * @param {Object} response - The response object, may contain Sentry transaction info.
   * @param {Function} next - The next middleware function to call.
   */
  return function requestErrorMiddleware(error, request, response, next) {
    // Determine if the error should be handled by Sentry
    const shouldHandleError = (
      (errorHandlerConfig && errorHandlerConfig.shouldHandleError) || yG9
    );
    if (shouldHandleError(error)) {
      // Use Sentry'createInteractionAccessor scope to add metadata and manage error reporting
      DI.withScope(scope => {
        // Attach request metadata for Sentry
        scope.setSDKProcessingMetadata({ request });

        // Attach transaction span if available and not already active
        const sentryTransaction = response.__sentry_transaction;
        if (sentryTransaction && !DI.getActiveSpan()) {
          scope.setSpan(sentryTransaction);
        }

        // Manage session status if auto session tracking is enabled
        const sentryClient = DI.getClient();
        if (sentryClient && D41.isAutoSessionTrackingEnabled(sentryClient)) {
          if (sentryClient._sessionFlusher !== undefined) {
            const session = scope.getRequestSession();
            // Mark session as crashed if status is present
            if (session && session.status !== undefined) {
              session.status = "crashed";
            }
          }
        }

        // Capture the exception in Sentry with middleware mechanism
        const sentryEventId = DI.captureException(error, {
          mechanism: {
            type: "middleware",
            handled: false
          }
        });

        // Attach the Sentry event updateSnapshotAndNotify to the response object
        response.sentry = sentryEventId;
        // Call the next middleware with the error
        next(error);
      });
      return;
    }
    // If not handled by Sentry, just call the next middleware
    next(error);
  };
}

module.exports = createRequestErrorMiddleware;