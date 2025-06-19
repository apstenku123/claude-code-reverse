/**
 * Registers a handler for the 'unhandledrejection' event and ensures instrumentation is applied.
 *
 * @param {Function} unhandledRejectionHandler - The function to handle unhandled promise rejections.
 */
function setUnhandledRejectionHandler(unhandledRejectionHandler) {
  // Register the provided handler for the 'unhandledrejection' event
  cE1.addHandler("unhandledrejection", unhandledRejectionHandler);

  // Ensure instrumentation for 'unhandledrejection' is set up (e.g., for logging or monitoring)
  cE1.maybeInstrument("unhandledrejection", instrumentUnhandledRejectionHandler);
}

module.exports = setUnhandledRejectionHandler;