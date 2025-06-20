/**
 * Creates a new interaction route transaction object.
 *
 * This function instantiates a new LzA object, which represents a transaction for tracking user interactions
 * and route changes within the application. It receives the necessary dependencies and configuration objects
 * to properly initialize the transaction.
 *
 * @param {Observable} interactionEntriesObservable - Observable emitting arrays of interaction entries to be mapped to route names.
 * @param {Object} interactionRouteConfig - Configuration object for mapping interaction entries to route names and context.
 * @param {Object} interactionSubscription - Subscription or handler for managing the lifecycle of the interaction entries observable.
 * @param {Function} startClickInteractionTransaction - Function to initiate a new UI action click transaction for tracing user interactions.
 * @param {Object} lzAOptions - Additional options or dependencies required by the LzA transaction object.
 * @returns {LzA} - a new instance of the LzA transaction object, initialized with the provided parameters.
 */
function createInteractionRouteTransaction(
  interactionEntriesObservable,
  interactionRouteConfig,
  interactionSubscription,
  startClickInteractionTransaction,
  lzAOptions
) {
  // Instantiate and return a new LzA transaction object with the provided dependencies
  return new LzA(
    interactionEntriesObservable,
    interactionRouteConfig,
    interactionSubscription,
    startClickInteractionTransaction,
    lzAOptions
  );
}

module.exports = createInteractionRouteTransaction;
