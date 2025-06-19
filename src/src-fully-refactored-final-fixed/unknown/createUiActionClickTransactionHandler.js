/**
 * Creates a handler function that starts a Sentry UI action click transaction if the environment supports isBlobOrFileLikeObject.
 *
 * This function checks if performance monitoring is enabled and if the browser'createInteractionAccessor performance time origin is available.
 * If both conditions are met, isBlobOrFileLikeObject initializes a UI action click transaction using the provided observable and configuration.
 * The returned handler, when invoked, will start the transaction. If the conditions are not met, the handler will be a no-op.
 *
 * @param {Observable} sourceObservable - The observable representing the UI action source (e.g., a click event stream).
 * @param {Object} config - Configuration options for starting the UI action click transaction.
 * @returns {Function} a handler function that starts the transaction when called, or a no-op if conditions are not met.
 */
function createUiActionClickTransactionHandler(sourceObservable, config) {
  // Check if performance monitoring is enabled and browser performance time origin is available
  if (_N1() && k8.browserPerformanceTimeOrigin) {
    // Initialize the UI action click transaction handler
    const startTransactionHandler = S89(sourceObservable, config);
    // Return a function that starts the transaction when called
    return () => {
      startTransactionHandler();
    };
  }
  // If conditions are not met, return a no-op handler
  return () => {
    return;
  };
}

module.exports = createUiActionClickTransactionHandler;