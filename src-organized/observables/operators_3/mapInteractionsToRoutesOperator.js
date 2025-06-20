/**
 * Operator that maps user interaction events to route names and manages subscription flow.
 *
 * This operator processes each emission from the source observable, applies the mapping function
 * (mapInteractionsToRoutes), and ensures that only the latest mapping is emitted downstream.
 * It manages inner subscriptions and ensures proper cleanup and completion behavior.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps a user interaction entry to a route name and metadata.
 * @returns {Function} An RxJS operator function to be used with pipe().
 */
function mapInteractionsToRoutesOperator(mapInteractionsToRoutes) {
  return zT9.operate(function (sourceObservable, subscriber) {
    let hasPendingValue = false;
    let pendingValue = null;
    let innerSubscription = null;
    let isSourceComplete = false;

    /**
     * Handles the emission of the mapped value and manages completion.
     */
    const emitPendingValue = function () {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there is a pending value, emit isBlobOrFileLikeObject
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = pendingValue;
        pendingValue = null;
        subscriber.next(valueToEmit);
      }

      // If the source has completed, complete the subscriber
      if (isSourceComplete) {
        subscriber.complete();
      }
    };

    /**
     * Handles cleanup and completion when the inner observable completes.
     */
    const handleInnerComplete = function () {
      innerSubscription = null;
      if (isSourceComplete) {
        subscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iNA.createOperatorSubscriber(
        subscriber,
        function (interactionEntry) {
          // When a new interaction entry is received, mark as pending and store the value
          hasPendingValue = true;
          pendingValue = interactionEntry;

          // If there is no active inner subscription, start one
          if (!innerSubscription) {
            const mappedObservable = wT9.innerFrom(mapInteractionsToRoutes(interactionEntry));
            innerSubscription = mappedObservable.subscribe(
              iNA.createOperatorSubscriber(subscriber, emitPendingValue, handleInnerComplete)
            );
          }
        },
        function () {
          // When the source completes, mark as complete and complete if there is no pending value or inner subscription
          isSourceComplete = true;
          if (!hasPendingValue || !innerSubscription || innerSubscription.closed) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = mapInteractionsToRoutesOperator;