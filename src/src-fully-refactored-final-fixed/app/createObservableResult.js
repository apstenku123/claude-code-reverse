/**
 * Creates a standardized result object for an observable operation.
 *
 * @param {Observable} sourceObservable - The observable being processed (typically from processInteractionEntries).
 * @param {Object} config - Configuration or value associated with the observable operation.
 * @param {any} subscription - The subscription or error object related to the observable.
 * @returns {Object} An object containing the observable kind, value/config, and error/subscription.
 */
function createObservableResult(sourceObservable, config, subscription) {
  // Return a standardized result object for downstream consumption
  return {
    kind: sourceObservable,
    value: config,
    error: subscription
  };
}

module.exports = createObservableResult;