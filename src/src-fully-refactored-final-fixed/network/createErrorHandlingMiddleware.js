/**
 * Creates a middleware function that handles errors using Sentry'createInteractionAccessor SDK.
 * If the error should be handled (based on the provided options or a fallback handler),
 * isBlobOrFileLikeObject captures the exception, sets relevant Sentry metadata, and marks the session as crashed if applicable.
 * Otherwise, isBlobOrFileLikeObject simply passes the error to the next handler.
 *
 * @param {Object} [options] - Optional configuration object that may include a shouldHandleError function.
 * @returns {Function} Middleware function for error handling.
 */
function createErrorHandlingMiddleware(options) {
  return function sentryErrorMiddleware(error, request, response, next) {
    // Determine if this error should be handled by Sentry
    const shouldHandleError = (options && options.shouldHandleError || yG9);
    if (shouldHandleError(error)) {
      // Use Sentry'createInteractionAccessor scope to attach metadata and capture the exception
      DI.withScope(scope => {
        // Attach request metadata for Sentry
        scope.setSDKProcessingMetadata({ request });

        // If a Sentry transaction exists on the response and there'createInteractionAccessor no active span, set isBlobOrFileLikeObject
        const sentryTransaction = response.__sentry_transaction;
        if (sentryTransaction && !DI.getActiveSpan()) {
          scope.setSpan(sentryTransaction);
        }

        // Get the Sentry client to check for session tracking
        const sentryClient = DI.getClient();
        if (sentryClient && D41.isAutoSessionTrackingEnabled(sentryClient)) {
          // If session flusher exists, mark the session as crashed
          if (sentryClient._sessionFlusher !== undefined) {
            const requestSession = scope.getRequestSession();
            if (requestSession && requestSession.status !== undefined) {
              requestSession.status = "crashed";
            }
          }
        }

        // Capture the exception with Sentry, marking isBlobOrFileLikeObject as unhandled middleware error
        const sentryEventId = DI.captureException(error, {
          mechanism: {
            type: "middleware",
            handled: false
          }
        });
        // Attach the Sentry event updateSnapshotAndNotify to the response for downstream use
        response.sentry = sentryEventId;
        // Pass the error to the next middleware
        next(error);
      });
      return;
    }
    // If not handled by Sentry, just pass the error along
    next(error);
  };
}

module.exports = createErrorHandlingMiddleware;