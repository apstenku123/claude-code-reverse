/**
 * Applies a mapping function to each emission from the source observable, subscribing to the resulting inner observable.
 * Emits the most recent value only after the inner observable completes. Ensures only one inner subscription at a time.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps an emitted value to an observable (e.g., mapping user interactions to routes).
 * @returns {Function} Operator function to be used with an observable pipeline.
 */
function mapInteractionsWithAggregateOnEmission(mapInteractionsToRoutes) {
  return oP9.operate(function (sourceObservable, destinationSubscriber) {
    let hasPendingEmission = false;
    let latestValue = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner observable. Emits the latest value if there was a pending emission.
     */
    const handleInnerComplete = () => {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there was a pending emission, emit the latest value
      if (hasPendingEmission) {
        hasPendingEmission = false;
        const valueToEmit = latestValue;
        latestValue = null;
        destinationSubscriber.next(valueToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        destinationSubscriber,
        function (emittedValue) {
          // Clean up any existing inner subscription
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasPendingEmission = true;
          latestValue = emittedValue;

          // Create a new inner subscription for the mapped observable
          innerSubscription = b$a.createOperatorSubscriber(
            destinationSubscriber,
            handleInnerComplete,
            tP9.noop
          );

          // Subscribe to the observable returned by the mapping function
          eP9.innerFrom(mapInteractionsToRoutes(emittedValue)).subscribe(innerSubscription);
        },
        function () {
          // On source completion, handle any pending emission and complete the destination
          handleInnerComplete();
          destinationSubscriber.complete();
        },
        undefined,
        function () {
          // On teardown, clear references
          latestValue = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = mapInteractionsWithAggregateOnEmission;