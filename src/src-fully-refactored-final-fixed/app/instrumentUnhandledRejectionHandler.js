/**
 * Instruments the global onunhandledrejection handler to trigger custom event handlers
 * and optionally call any previously assigned handler. This is typically used to hook
 * into unhandled promise rejections for error tracking or logging purposes.
 *
 * @returns {void} This function does not return a value.
 */
function instrumentUnhandledRejectionHandler() {
  // Store any existing onunhandledrejection handler to preserve previous behavior
  const previousUnhandledRejectionHandler = pE1.GLOBAL_OBJ.onunhandledrejection;

  // Override the global onunhandledrejection handler
  pE1.GLOBAL_OBJ.onunhandledrejection = function (event) {
    // Trigger custom event handlers for 'unhandledrejection'
    cE1.triggerHandlers("unhandledrejection", event);

    // If there was a previous handler and isBlobOrFileLikeObject'createInteractionAccessor not a Sentry loader, call isBlobOrFileLikeObject
    if (
      previousUnhandledRejectionHandler &&
      !previousUnhandledRejectionHandler.__SENTRY_LOADER__
    ) {
      return previousUnhandledRejectionHandler.apply(this, arguments);
    }
    // Otherwise, indicate that the event was handled
    return true;
  };

  // Mark the handler as instrumented to prevent double-instrumentation
  pE1.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}

module.exports = instrumentUnhandledRejectionHandler;