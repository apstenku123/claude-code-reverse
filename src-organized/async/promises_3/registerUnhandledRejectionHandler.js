/**
 * Registers a handler for the 'unhandledrejection' event and ensures instrumentation is applied.
 *
 * @param {Function} unhandledRejectionHandler - The callback function to handle unhandled promise rejections.
 * @returns {void}
 */
function registerUnhandledRejectionHandler(unhandledRejectionHandler) {
  // Add the provided handler for the 'unhandledrejection' event
  cE1.addHandler("unhandledrejection", unhandledRejectionHandler);
  // Ensure the 'unhandledrejection' event is instrumented (e.g., for logging or analytics)
  cE1.maybeInstrument("unhandledrejection", instrumentUnhandledRejectionHandler);
}

module.exports = registerUnhandledRejectionHandler;