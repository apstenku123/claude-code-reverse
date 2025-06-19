/**
 * Registers a handler for the 'history' event and ensures the 'history' instrumentation is applied.
 *
 * @param {Function} historyHandler - The function to handle 'history' events.
 * @returns {void}
 */
function registerHistoryHandler(historyHandler) {
  // Register the provided handler for 'history' events
  q21.addHandler("history", historyHandler);
  // Ensure the 'history' instrumentation is applied (if not already)
  q21.maybeInstrument("history", setupHistoryEventHandlers);
}

module.exports = registerHistoryHandler;