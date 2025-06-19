/**
 * Initializes tracing for Sentry if performance APIs are available, and sets up cleanup handlers.
 *
 * This function checks if the environment supports performance tracing and if the browser'createInteractionAccessor performance time origin is available.
 * If so, isBlobOrFileLikeObject marks the tracing initialization and sets up several handlers related to activity tracking, random number generation,
 * UI action transaction, and route mapping. It returns a function that, when called, will clean up all these handlers.
 * If tracing is not supported, isBlobOrFileLikeObject returns a no-op cleanup function.
 *
 * @returns {Function} Cleanup function that tears down all tracing handlers when invoked.
 */
function initializeTracingAndCleanupHandlers() {
  // Check if the environment supports mapping interactions to routes
  const interactionRouteMapper = mapInteractionsToRoutes();

  // Ensure performance tracing is only initialized if supported and available
  if (interactionRouteMapper && k8.browserPerformanceTimeOrigin) {
    // Mark the start of Sentry tracing initialization if the Performance API is available
    if (interactionRouteMapper.mark) {
      WU.WINDOW.performance.mark("sentry-tracing-init");
    }

    // Initialize all tracing-related handlers
    const addActivityHandler = addActivityIfNotFinished();
    const randomNumberHandler = generateRandomNumberBetweenZeroAndSixteen();
    const uiActionClickTransactionHandler = startUiActionClickTransaction();
    const routeMappingHandler = P89(); // P89 is not described, assumed to be a handler

    // Return a cleanup function that tears down all handlers
    return () => {
      addActivityHandler();
      randomNumberHandler();
      uiActionClickTransactionHandler();
      routeMappingHandler();
    };
  }

  // If tracing is not supported, return a no-op cleanup function
  return () => {
    return;
  };
}

module.exports = initializeTracingAndCleanupHandlers;