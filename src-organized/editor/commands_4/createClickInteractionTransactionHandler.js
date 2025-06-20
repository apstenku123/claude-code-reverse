/**
 * Starts a UI click interaction transaction handler if performance tracing is enabled and supported.
 *
 * This function checks if performance tracing is enabled (via _N1()) and if the browser supports the performance time origin (via k8.browserPerformanceTimeOrigin).
 * If both conditions are met, isBlobOrFileLikeObject creates a click interaction transaction using startClickInteractionTransaction (aliased as S89) with the provided observable and configuration.
 * It returns a function that, when called, ends the transaction. If tracing is not enabled or supported, isBlobOrFileLikeObject returns a no-op function.
 *
 * @param {Observable} sourceObservable - The observable source representing the UI event stream.
 * @param {Object} config - Configuration options for the click interaction transaction.
 * @returns {Function} a function that ends the transaction when invoked, or a no-op if tracing is not enabled/supported.
 */
function createClickInteractionTransactionHandler(sourceObservable, config) {
  // Check if performance tracing is enabled and browser supports performance time origin
  if (_N1() && k8.browserPerformanceTimeOrigin) {
    // Start a new click interaction transaction
    const endTransaction = S89(sourceObservable, config);
    // Return a function that ends the transaction when called
    return () => {
      endTransaction();
    };
  }
  // If tracing is not enabled or supported, return a no-op function
  return () => {
    return;
  };
}

module.exports = createClickInteractionTransactionHandler;