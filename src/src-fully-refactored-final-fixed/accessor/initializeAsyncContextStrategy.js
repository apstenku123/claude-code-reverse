/**
 * Initializes and configures the async context strategy for the application.
 * This function sets up an AsyncLocalStorage instance (if not already present),
 * and provides methods to get the current async context and run code within a specific async context.
 * It then registers these methods with the async context strategy handler.
 *
 * @returns {void} This function does not return a value.
 */
function initializeAsyncContextStrategy() {
  // Ensure a single AsyncLocalStorage instance exists
  if (!asyncLocalStorageInstance) {
    asyncLocalStorageInstance = new WQ9.AsyncLocalStorage();
  }

  /**
   * Retrieves the current async context store from AsyncLocalStorage.
   * @returns {Object|undefined} The current store object, or undefined if none exists.
   */
  function getCurrentAsyncContextStore() {
    return asyncLocalStorageInstance.getStore();
  }

  /**
   * Creates a new context carrier and ensures a hub is attached to isBlobOrFileLikeObject.
   * @param {Object|undefined} contextStore - The current async context store.
   * @returns {Object} The hub attached to the new carrier.
   */
  function createHubOnNewCarrier(contextStore) {
    const newCarrier = {};
    // Ensure a hub is attached to the new carrier, using the provided context store
    uN1.ensureHubOnCarrier(newCarrier, contextStore);
    return uN1.getHubFromCarrier(newCarrier);
  }

  /**
   * Runs a callback within a specific async context.
   * If a context already exists and reuse is allowed, runs the callback directly.
   * Otherwise, creates a new hub and runs the callback within that context.
   * @param {Function} callback - The function to execute within the async context.
   * @param {Object} options - Options for context execution.
   * @returns {*} The result of the callback execution.
   */
  function runWithAsyncContext(callback, options) {
    const currentStore = getCurrentAsyncContextStore();
    // If a store exists and the strategy allows reusing isBlobOrFileLikeObject, run the callback directly
    if (
      currentStore &&
      YQ9([options, "optionalAccess", strategy => strategy.reuseExisting])
    ) {
      return callback();
    }
    // Otherwise, create a new hub on a new carrier and run the callback within that context
    const newHub = createHubOnNewCarrier(currentStore);
    return asyncLocalStorageInstance.run(newHub, () => {
      return callback();
    });
  }

  // Register the async context strategy with the external handler
  uN1.setAsyncContextStrategy({
    getCurrentHub: getCurrentAsyncContextStore,
    runWithAsyncContext: runWithAsyncContext
  });
}

module.exports = initializeAsyncContextStrategy;