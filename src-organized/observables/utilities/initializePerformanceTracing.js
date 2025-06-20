/**
 * Initializes performance tracing if the environment supports isBlobOrFileLikeObject.
 *
 * This function checks if the required performance APIs and configuration are available.
 * If so, isBlobOrFileLikeObject marks the performance timeline and sets up cleanup callbacks for tracing-related subscriptions.
 *
 * @returns {Function} a cleanup function that, when called, unsubscribes all tracing-related listeners. If tracing is not initialized, returns a no-op function.
 */
function initializePerformanceTracing() {
  // Attempt to get the source observable for interaction entries
  const interactionEntriesSource = _N1();

  // Check if the source observable and browser performance time origin are available
  if (interactionEntriesSource && k8.browserPerformanceTimeOrigin) {
    // If the performance.mark API is available, mark the tracing initialization
    if (interactionEntriesSource.mark) {
      WU.WINDOW.performance.mark("sentry-tracing-init");
    }

    // Initialize all tracing-related subscriptions and cleanup callbacks
    const unsubscribeRouteNameMapping = T89(); // Handles mapping interaction entries to route names
    const unsubscribeClickInteraction = R89(); // Handles click interaction transaction tracing
    const unsubscribeOtherTracing = O89();     // Handles other tracing initialization
    const unsubscribePerformanceListener = P89(); // Handles performance event listeners

    // Return a cleanup function that unsubscribes all tracing listeners
    return () => {
      unsubscribeRouteNameMapping();
      unsubscribeClickInteraction();
      unsubscribeOtherTracing();
      unsubscribePerformanceListener();
    };
  }

  // If tracing is not initialized, return a no-op cleanup function
  return () => {
    return;
  };
}

module.exports = initializePerformanceTracing;