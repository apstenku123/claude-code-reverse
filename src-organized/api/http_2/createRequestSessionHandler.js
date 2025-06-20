/**
 * Initializes and returns a request handler function that manages session tracking, 
 * SDK metadata, and request flushing for incoming requests.
 *
 * @param {Object} options - Configuration options for session tracking and flushing.
 * @param {number} [options.flushTimeout] - Optional timeout (ms) for flushing events before completing the request.
 * @returns {Function} Express-style middleware function for request/session handling.
 */
function createRequestSessionHandler(options) {
  // Extract configuration from the provided options
  const requestDataOptions = buildIncludeConfig(options);
  const initialClient = DI.getClient();

  // If auto session tracking is enabled, initialize session flusher and session on the current scope
  if (initialClient && D41.isAutoSessionTrackingEnabled(initialClient)) {
    initialClient.initSessionFlusher();
    const currentScope = DI.getCurrentScope();
    if (currentScope.getSession()) {
      currentScope.setSession();
    }
  }

  /**
   * Middleware handler for processing a request, managing session, and flushing events.
   *
   * @param {Object} request - The incoming request object.
   * @param {Object} response - The outgoing response object (supports .once and .end).
   * @param {Function} next - The next middleware function in the stack.
   */
  return function requestSessionHandler(request, response, next) {
    // If a flush timeout is specified, wrap the response'createInteractionAccessor end method to flush events before ending
    if (options && options.flushTimeout && options.flushTimeout > 0) {
      const originalEnd = response.end;
      response.end = function wrappedEnd(...args) {
        DI.flush(options.flushTimeout)
          .then(() => {
            originalEnd.apply(this, args);
          })
          .catch(error => {
            if (TG9.DEBUG_BUILD && Jx.logger && typeof Jx.logger.error === 'function') {
              Jx.logger.error(error);
            }
            originalEnd.apply(this, args);
          });
      };
    }

    // Run the following logic within the SDK'createInteractionAccessor async context
    DI.runWithAsyncContext(() => {
      const currentScope = DI.getCurrentScope();
      // Attach SDK processing metadata to the current scope
      currentScope.setSDKProcessingMetadata({
        request,
        requestDataOptionsFromExpressHandler: requestDataOptions
      });

      const client = DI.getClient();
      // If auto session tracking is enabled, set the request session status to 'ok'
      if (D41.isAutoSessionTrackingEnabled(client)) {
        currentScope.setRequestSession({ status: 'ok' });
      }

      // When the response finishes, capture the request session if supported
      response.once('finish', () => {
        const finishedClient = DI.getClient();
        if (D41.isAutoSessionTrackingEnabled(finishedClient)) {
          setImmediate(() => {
            if (finishedClient && typeof finishedClient._captureRequestSession === 'function') {
              finishedClient._captureRequestSession();
            }
          });
        }
      });

      // Proceed to the next middleware
      next();
    });
  };
}

module.exports = createRequestSessionHandler;