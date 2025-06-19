/**
 * Maps user interaction entries to route names and aggregates input entries without recent input.
 *
 * This function creates an operator that, for each value emitted by the source observable,
 * maps the value using the provided mapping function (mapInteractionsToRouteNames),
 * then aggregates recent input entries (aggregateRecentInputEntries) in a controlled manner.
 * It ensures only one inner subscription is active at a time, and emits the result when aggregation completes.
 *
 * @param {Function} mapInteractionsToRouteNames - Function that maps user interaction entries to route names and context.
 * @returns {Function} Operator function to be used with an observable.
 */
function mapInteractionsWithAggregation(mapInteractionsToRouteNames) {
  return oP9.operate(function (sourceObservable, subscriber) {
    let hasPendingAggregation = false;
    let latestAggregatedValue = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner aggregation observable.
     * Cleans up the inner subscription and emits the latest aggregated value if pending.
     */
    const handleAggregationComplete = () => {
      // Unsubscribe from any existing inner subscription
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there is a pending aggregation, emit the latest value
      if (hasPendingAggregation) {
        hasPendingAggregation = false;
        const valueToEmit = latestAggregatedValue;
        latestAggregatedValue = null;
        subscriber.next(valueToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        subscriber,
        /**
         * Handles each value emitted by the source observable.
         * Initiates a new aggregation, unsubscribing from any previous one.
         * @param {*} emittedValue - The value emitted by the source observable.
         */
        function (emittedValue) {
          // Unsubscribe from any existing inner aggregation
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasPendingAggregation = true;
          latestAggregatedValue = emittedValue;

          // Create a new inner subscriber for aggregation completion
          innerSubscription = b$a.createOperatorSubscriber(
            subscriber,
            handleAggregationComplete,
            tP9.noop
          );

          // Start aggregation using the mapping function
          eP9.innerFrom(mapInteractionsToRouteNames(emittedValue)).subscribe(innerSubscription);
        },
        /**
         * Handles completion of the source observable.
         * Ensures any pending aggregation is emitted and completes the subscriber.
         */
        function () {
          handleAggregationComplete();
          subscriber.complete();
        },
        undefined,
        /**
         * Handles teardown logic when the subscriber is unsubscribed.
         * Cleans up references to prevent memory leaks.
         */
        function () {
          latestAggregatedValue = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = mapInteractionsWithAggregation;