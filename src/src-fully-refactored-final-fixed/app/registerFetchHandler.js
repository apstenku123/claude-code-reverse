/**
 * Registers a handler for the 'fetch' event and ensures instrumentation is applied.
 *
 * @param {Function} fetchHandler - The handler function to be registered for the 'fetch' event.
 * @returns {void}
 *
 * This function adds the provided fetch handler to the rp event system and ensures
 * that the 'fetch' event is instrumented by calling the appropriate instrumentation function.
 */
function registerFetchHandler(fetchHandler) {
  // Register the provided handler for the 'fetch' event
  rp.addHandler("fetch", fetchHandler);
  // Ensure the 'fetch' event is instrumented (e.g., for logging, tracing, etc.)
  rp.maybeInstrument("fetch", hd2);
}

module.exports = registerFetchHandler;