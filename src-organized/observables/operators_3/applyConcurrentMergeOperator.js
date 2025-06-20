/**
 * Applies a concurrent merge operator to an observable sequence.
 *
 * This function wraps the C_9.operate method, providing a merge operator that merges
 * inner observables emitted by the source observable, with a configurable concurrency limit.
 *
 * @param {Observable} sourceObservable - The observable whose emissions will be merged.
 * @param {number} [concurrencyLimit=Infinity] - The maximum number of inner subscriptions to be active at once. If less than 1, defaults to Infinity.
 * @param {Subscription} [outerSubscription] - Optional subscription to manage unsubscription behavior.
 * @returns {OperatorFunction} An operator function to be used with observable pipelines.
 */
function applyConcurrentMergeOperator(sourceObservable, concurrencyLimit = Infinity, outerSubscription) {
  // If concurrencyLimit is falsy or less than 1, default to Infinity
  concurrencyLimit = (concurrencyLimit || 0) < 1 ? Infinity : concurrencyLimit;

  // Return the operator function using C_9.operate
  return C_9.operate(function (destination, source) {
    // Use V_9.mergeInternals to handle merging logic with concurrency control
    return V_9.mergeInternals(
      destination,         // Observer to emit merged values
      source,              // Source observable
      sourceObservable,    // Inner observable factory or observable
      concurrencyLimit,    // Maximum concurrent inner subscriptions
      undefined,           // No custom result selector
      true,                // Use concurrent merging
      outerSubscription    // Optional subscription
    );
  });
}

module.exports = applyConcurrentMergeOperator;