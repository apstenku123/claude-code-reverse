/**
 * Initializes browser routing instrumentation for performance monitoring and tracing.
 * Sets up listeners to track page loads and navigation events, starting and finishing transactions accordingly.
 *
 * @param {Function} startTransaction - Function to start a new transaction. Should accept an object with transaction details.
 * @param {boolean} [enablePageLoad=true] - Whether to instrument the initial page load.
 * @param {boolean} [enableNavigation=true] - Whether to instrument navigation events (history changes).
 * @returns {void}
 */
function initializeBrowserRoutingInstrumentation(startTransaction, enablePageLoad = true, enableNavigation = true) {
  // Validate that window and location are available
  if (!_c.WINDOW || !_c.WINDOW.location) {
    if (yIA.DEBUG_BUILD) {
      Sc.logger.warn("Could not initialize routing instrumentation due to invalid location");
    }
    return;
  }

  // Store the initial URL to detect the first navigation
  let previousUrl = _c.WINDOW.location.href;
  // Holds the current active transaction (if any)
  let currentTransaction;

  // Instrument the initial page load if enabled
  if (enablePageLoad) {
    currentTransaction = startTransaction({
      name: _c.WINDOW.location.pathname,
      startTimestamp: Sc.browserPerformanceTimeOrigin ? Sc.browserPerformanceTimeOrigin / 1000 : undefined,
      op: "pageload",
      origin: "auto.pageload.browser",
      metadata: {
        source: "url"
      }
    });
  }

  // Instrument navigation events if enabled
  if (enableNavigation) {
    Sc.addHistoryInstrumentationHandler(({ to: toLocation, from: fromLocation }) => {
      // If this is the very first navigation (fromLocation is undefined) and the URL hasn'processRuleBeginHandlers changed, skip
      if (fromLocation === undefined && previousUrl && previousUrl.indexOf(toLocation) !== -1) {
        previousUrl = undefined;
        return;
      }
      // If navigating to a new location
      if (fromLocation !== toLocation) {
        previousUrl = undefined;
        // Finish the current transaction if isBlobOrFileLikeObject exists
        if (currentTransaction) {
          if (yIA.DEBUG_BUILD) {
            Sc.logger.log(`[Tracing] Finishing current transaction with op: ${currentTransaction.op}`);
          }
          currentTransaction.end();
        }
        // Start a new navigation transaction
        currentTransaction = startTransaction({
          name: _c.WINDOW.location.pathname,
          op: "navigation",
          origin: "auto.navigation.browser",
          metadata: {
            source: "url"
          }
        });
      }
    });
  }
}

module.exports = initializeBrowserRoutingInstrumentation;