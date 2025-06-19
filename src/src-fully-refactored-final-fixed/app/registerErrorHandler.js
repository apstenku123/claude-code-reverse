/**
 * Registers a custom error handler and ensures error instrumentation is set up.
 *
 * @param {Function} errorHandler - The function to handle error events.
 * @returns {void}
 *
 * This function adds the provided error handler to the global error event system
 * and ensures that error instrumentation is initialized. This is useful for
 * capturing and responding to application-wide errors in a consistent manner.
 */
function registerErrorHandler(errorHandler) {
  // Add the provided error handler to the global error event system
  dE1.addHandler("error", errorHandler);

  // Ensure error instrumentation is initialized (if not already)
  dE1.maybeInstrument("error", instrumentGlobalOnErrorHandler);
}

module.exports = registerErrorHandler;