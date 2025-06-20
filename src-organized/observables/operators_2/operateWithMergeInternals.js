/**
 * Applies a merging operation to observables with configurable concurrency and subscription options.
 *
 * @param {Observable} sourceObservable - The source observable to merge with others.
 * @param {number} [concurrency=Infinity] - The maximum number of concurrent subscriptions allowed. Defaults to Infinity if not provided or less than 1.
 * @param {any} subscriptionOptions - Additional options or context for the subscription process.
 * @returns {Function} An operator function that can be used with observables to apply the merge logic.
 */
function operateWithMergeInternals(sourceObservable, concurrency = Infinity, subscriptionOptions) {
  // If concurrency is not provided or less than 1, default to Infinity
  if (concurrency === undefined) {
    concurrency = Infinity;
  }
  concurrency = (concurrency || 0) < 1 ? Infinity : concurrency;

  // Return an operator function using C_9.operate
  return C_9.operate(function (outerSubscriber, innerObservable) {
    // Merge internals with provided parameters
    return V_9.mergeInternals(
      outerSubscriber,         // The subscriber to the outer observable
      innerObservable,         // The inner observable to merge
      sourceObservable,        // The source observable
      concurrency,             // Maximum concurrency
      undefined,               // No initial value
      true,                    // Use the merge strategy
      subscriptionOptions      // Additional subscription options
    );
  });
}

module.exports = operateWithMergeInternals;