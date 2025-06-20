/**
 * Creates an accessor operator that processes interaction entries from a source observable.
 * For each emitted value, isBlobOrFileLikeObject applies the processInteractionEntries function and manages inner subscriptions.
 * Ensures only the latest inner subscription is active and handles completion logic.
 *
 * @param {Function} processInteractionEntries - Function that processes an interaction entry and returns an observable.
 * @returns {Function} Operator function to be used with an observable.
 */
function createInteractionEntryAccessor(processInteractionEntries) {
  return zT9.operate(function (sourceObservable, subscriber) {
    let hasPendingValue = false;
    let pendingValue = null;
    let innerSubscription = null;
    let isSourceCompleted = false;

    /**
     * Handles completion of the inner subscription.
     * If there is a pending value, emits isBlobOrFileLikeObject to the subscriber.
     * Completes the subscriber if the source is also completed.
     */
    const handleInnerComplete = function () {
      // Clean up inner subscription
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = pendingValue;
        pendingValue = null;
        subscriber.next(valueToEmit);
      }
      if (isSourceCompleted) {
        subscriber.complete();
      }
    };

    /**
     * Handles cleanup when the inner subscription completes without a pending value.
     * Completes the subscriber if the source is also completed.
     */
    const handleInnerFinalize = function () {
      innerSubscription = null;
      if (isSourceCompleted) {
        subscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iNA.createOperatorSubscriber(
        subscriber,
        function (interactionEntry) {
          // On each value from the source, set as pending and process
          hasPendingValue = true;
          pendingValue = interactionEntry;
          // If no inner subscription is active, start a new one
          if (!innerSubscription) {
            innerSubscription = wT9.innerFrom(processInteractionEntries(interactionEntry)).subscribe(
              iNA.createOperatorSubscriber(subscriber, handleInnerComplete, handleInnerFinalize)
            );
          }
        },
        function () {
          // On source completion, mark as completed and complete if no pending work
          isSourceCompleted = true;
          if (!hasPendingValue || !innerSubscription || innerSubscription.closed) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = createInteractionEntryAccessor;