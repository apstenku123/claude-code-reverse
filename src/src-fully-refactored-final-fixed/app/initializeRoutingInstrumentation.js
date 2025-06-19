/**
 * Initializes browser routing instrumentation for performance monitoring and tracing.
 * Sets up listeners to track page loads and navigation events, and manages transaction lifecycles accordingly.
 *
 * @param {Function} startTransaction - Function that starts a new transaction. Should accept a transaction context object and return a transaction instance.
 * @param {boolean} [enablePageLoad=true] - Whether to start a transaction on initial page load.
 * @param {boolean} [enableNavigation=true] - Whether to start transactions on navigation events (history changes).
 * @returns {void}
 */
function initializeRoutingInstrumentation(startTransaction, enablePageLoad = true, enableNavigation = true) {
  // Ensure window and location are available before proceeding
  if (!_c.WINDOW || !_c.WINDOW.location) {
    if (yIA.DEBUG_BUILD) {
      Sc.logger.warn("Could not initialize routing instrumentation due to invalid location");
    }
    return;
  }

  // Store the initial URL to help detect the first navigation event
  let previousUrl = _c.WINDOW.location.href;
  // Holds the current active transaction instance
  let activeTransaction;

  // Optionally start a transaction for the initial page load
  if (enablePageLoad) {
    activeTransaction = startTransaction({
      name: _c.WINDOW.location.pathname,
      startTimestamp: Sc.browserPerformanceTimeOrigin ? Sc.browserPerformanceTimeOrigin / 1000 : undefined,
      op: "pageload",
      origin: "auto.pageload.browser",
      metadata: {
        source: "url"
      }
    });
  }

  // Optionally set up navigation (history) instrumentation
  if (enableNavigation) {
    Sc.addHistoryInstrumentationHandler(({ to: toUrl, from: fromUrl }) => {
      // If this is the first navigation and the previous URL contains the new URL, skip (likely a reload)
      if (fromUrl === undefined && previousUrl && previousUrl.indexOf(toUrl) !== -1) {
        previousUrl = undefined;
        return;
      }
      // If navigating to a different URL, finish the current transaction and start a new one
      if (fromUrl !== toUrl) {
        previousUrl = undefined;
        if (activeTransaction) {
          if (yIA.DEBUG_BUILD) {
            Sc.logger.log(`[Tracing] Finishing current transaction with op: ${activeTransaction.op}`);
          }
          activeTransaction.end();
        }
        activeTransaction = startTransaction({
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

module.exports = initializeRoutingInstrumentation;