/**
 * Initializes global error and unhandled rejection instrumentation handlers.
 * Ensures that handlers are only registered once per application lifecycle.
 *
 * @returns {void} This function does not return a value.
 */
function initializeGlobalErrorHandlers() {
  // If the global error handlers have already been initialized, exit early
  if (globalErrorHandlersInitialized) return;

  // Mark that the global error handlers have now been initialized
  globalErrorHandlersInitialized = true;

  // Register the error handler for global errors
  instrumentationManager.addGlobalErrorInstrumentationHandler(globalErrorHandler);

  // Register the error handler for unhandled promise rejections
  instrumentationManager.addGlobalUnhandledRejectionInstrumentationHandler(globalErrorHandler);
}

module.exports = initializeGlobalErrorHandlers;