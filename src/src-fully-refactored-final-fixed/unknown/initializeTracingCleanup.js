/**
 * Initializes Sentry tracing for browser performance and returns a cleanup function.
 *
 * This function checks if browser performance tracing is available and, if so,
 * sets up Sentry performance marks and related tracing hooks. It returns a cleanup
 * function that, when called, will remove all tracing hooks and listeners.
 *
 * @returns {Function} Cleanup function to remove tracing hooks, or a no-op if tracing is not enabled.
 */
function initializeTracingCleanup() {
  // Attempt to get the source observable for tracing (e.g., performance entries)
  const sourceObservable = _N1();

  // Check if tracing is enabled and browser performance time origin is available
  if (sourceObservable && k8.browserPerformanceTimeOrigin) {
    // If the observable supports marking, add a Sentry performance mark
    if (sourceObservable.mark) {
      WU.WINDOW.performance.mark("sentry-tracing-init");
    }

    // Set up tracing hooks and listeners
    const setupPerformanceListener = T89(); // Not yet refactored
    const setupNavigationListener = R89();  // Not yet refactored
    const setupUiActionListener = O89();    // startUiActionClickTransaction
    const setupReplayListener = P89();      // Not yet refactored

    // Return a cleanup function that removes all tracing hooks/listeners
    return () => {
      setupPerformanceListener();
      setupNavigationListener();
      setupUiActionListener();
      setupReplayListener();
    };
  }

  // If tracing is not enabled, return a no-op cleanup function
  return () => {
    return;
  };
}

module.exports = initializeTracingCleanup;