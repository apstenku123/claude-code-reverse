/**
 * Applies a switchMap-like operator that, for each value from the source observable,
 * unsubscribes from any previous inner observable, subscribes to a new inner observable
 * created from the provided mapping function, and emits the most recent value when the inner completes.
 * Additionally, aggregates recent input entries on completion.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps a value from the source observable to an inner observable.
 * @returns {Function} Operator function to be used with an observable.
 */
function switchMapWithAggregateOnComplete(mapInteractionsToRoutes) {
  return oP9.operate(function (sourceObservable, destinationSubscriber) {
    let hasPendingValue = false;
    let lastEmittedValue = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner observable.
     * If there is a pending value, emits isBlobOrFileLikeObject to the destination subscriber.
     * Cleans up the inner subscription.
     */
    const handleInnerComplete = function () {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there is a pending value, emit isBlobOrFileLikeObject and reset state
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = lastEmittedValue;
        lastEmittedValue = null;
        destinationSubscriber.next(valueToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        destinationSubscriber,
        function (sourceValue) {
          // On each value from the source, unsubscribe from previous inner
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasPendingValue = true;
          lastEmittedValue = sourceValue;

          // Create a new inner observable from the mapping function
          innerSubscription = b$a.createOperatorSubscriber(
            destinationSubscriber,
            aggregateRecentInputEntries, // Called on each value from the inner observable
            tP9.noop // No-op for complete
          );

          // Subscribe to the new inner observable
          eP9.innerFrom(mapInteractionsToRoutes(sourceValue)).subscribe(innerSubscription);
        },
        function () {
          // On source complete, handle inner completion and complete destination
          handleInnerComplete();
          destinationSubscriber.complete();
        },
        undefined,
        function () {
          // On unsubscribe, clean up state
          lastEmittedValue = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = switchMapWithAggregateOnComplete;