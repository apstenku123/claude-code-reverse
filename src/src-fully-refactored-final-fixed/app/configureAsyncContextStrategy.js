/**
 * Configures the asynchronous context strategy for the application.
 * This function sets the strategy used by the JP module to manage asynchronous context,
 * providing functions to get the current hub and to run code within an async context.
 *
 * @returns {void} This function does not return a value.
 */
function configureAsyncContextStrategy() {
  // Set the async context strategy with the provided getCurrentHub and runWithAsyncContext implementations
  JP.setAsyncContextStrategy({
    getCurrentHub: getCurrentAsyncContextHub,
    runWithAsyncContext: runWithAsyncContext
  });
}

// Export the function for use in other modules
module.exports = configureAsyncContextStrategy;
