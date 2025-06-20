/**
 * Initializes and configures the async context accessor strategy for Sentry hubs.
 *
 * This function ensures that an AsyncLocalStorage instance is available, and sets up
 * the strategy for retrieving and running code within the current Sentry hub context.
 * It provides a way to get the current hub and to run a callback within a specific async context.
 *
 * @returns {void} This function does not return a value.
 */
function initializeAsyncContextAccessor() {
  // Ensure the AsyncLocalStorage instance exists
  if (!asyncLocalStorageInstance) {
    asyncLocalStorageInstance = new WQ9.AsyncLocalStorage();
  }

  /**
   * Retrieves the current async context store (the current Sentry hub carrier).
   *
   * @returns {Object|undefined} The current context store, or undefined if not set.
   */
  function getCurrentAsyncContextStore() {
    return asyncLocalStorageInstance.getStore();
  }

  /**
   * Creates a new Sentry hub carrier object from the given context store.
   *
   * @param {Object|undefined} contextStore - The current async context store.
   * @returns {Object} The Sentry hub instance from the new carrier.
   */
  function createHubFromContext(contextStore) {
    const newCarrier = {};
    // Ensure a hub is attached to the new carrier, using the provided context store
    uN1.ensureHubOnCarrier(newCarrier, contextStore);
    // Retrieve the hub from the new carrier
    return uN1.getHubFromCarrier(newCarrier);
  }

  /**
   * Runs a callback within the async context of a Sentry hub.
   *
   * If a context store exists and the provided options indicate that reusing the existing context is allowed,
   * the callback is executed directly. Otherwise, a new hub is created and the callback is run within its context.
   *
   * @param {Function} callback - The function to execute within the async context.
   * @param {Object} options - Options for context execution (e.g., reuseExisting flag).
   * @returns {*} The result of the callback execution.
   */
  function runWithAsyncContext(callback, options) {
    const currentContextStore = getCurrentAsyncContextStore();
    // If a context exists and the options allow reusing isBlobOrFileLikeObject, run the callback directly
    if (
      currentContextStore &&
      YQ9([options, "optionalAccess", contextOptions => contextOptions.reuseExisting])
    ) {
      return callback();
    }
    // Otherwise, create a new hub from the current context and run the callback within its async context
    const newHub = createHubFromContext(currentContextStore);
    return asyncLocalStorageInstance.run(newHub, () => {
      return callback();
    });
  }

  // Register the async context strategy with Sentry'createInteractionAccessor hub utility
  uN1.setAsyncContextStrategy({
    getCurrentHub: getCurrentAsyncContextStore,
    runWithAsyncContext: runWithAsyncContext
  });
}

module.exports = initializeAsyncContextAccessor;