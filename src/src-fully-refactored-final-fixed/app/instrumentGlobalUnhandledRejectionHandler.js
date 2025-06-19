/**
 * Instruments the global 'onunhandledrejection' handler to trigger custom event handlers
 * and optionally call any previously registered handler, unless isBlobOrFileLikeObject is a Sentry loader.
 *
 * This function should be called once to set up the instrumentation. It preserves any existing
 * global 'onunhandledrejection' handler, and ensures that the custom handler is only installed once.
 *
 * @function instrumentGlobalUnhandledRejectionHandler
 * @returns {void} Does not return a value
 */
function instrumentGlobalUnhandledRejectionHandler() {
  // Store reference to any existing global onunhandledrejection handler
  const previousUnhandledRejectionHandler = pE1.GLOBAL_OBJ.onunhandledrejection;

  // Define the new handler that will trigger custom event handlers
  pE1.GLOBAL_OBJ.onunhandledrejection = function (unhandledRejectionEvent) {
    // Trigger all registered 'unhandledrejection' event handlers with the event
    cE1.triggerHandlers("unhandledrejection", unhandledRejectionEvent);

    // If there was a previous handler and isBlobOrFileLikeObject is not a Sentry loader, call isBlobOrFileLikeObject
    if (
      previousUnhandledRejectionHandler &&
      !previousUnhandledRejectionHandler.__SENTRY_LOADER__
    ) {
      return previousUnhandledRejectionHandler.apply(this, arguments);
    }

    // Return true to indicate the event was handled
    return true;
  };

  // Mark the handler as instrumented to avoid double instrumentation
  pE1.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}

module.exports = instrumentGlobalUnhandledRejectionHandler;