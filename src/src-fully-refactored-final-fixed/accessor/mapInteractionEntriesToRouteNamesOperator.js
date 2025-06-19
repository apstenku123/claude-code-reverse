/**
 * Operator function that maps each value from the source observable to a new observable
 * using the provided mapping function (mapInteractionEntriesToRouteNames), and emits only
 * the latest result, unsubscribing from previous inner subscriptions as new values arrive.
 *
 * This behaves similarly to switchMap, but is tailored for mapping interaction entries to route names.
 *
 * @param {function} mapInteractionEntriesToRouteNames - Function that takes an interaction entry and returns an observable of route names.
 * @returns {function} Operator function to be used with an observable pipeline.
 */
function mapInteractionEntriesToRouteNamesOperator(mapInteractionEntriesToRouteNames) {
  return zT9.operate(function (sourceObservable, destinationSubscriber) {
    let hasPendingValue = false; // Indicates if a value is currently being processed
    let latestValue = null;      // Stores the latest value received from the source
    let innerSubscription = null; // Holds the current inner subscription
    let isSourceComplete = false; // Tracks if the source observable has completed

    /**
     * Handles emission from the inner observable. Called when the inner observable emits.
     */
    const handleInnerNext = () => {
      // Unsubscribe from the current inner subscription
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there is a pending value, emit isBlobOrFileLikeObject
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = latestValue;
        latestValue = null;
        destinationSubscriber.next(valueToEmit);
      }

      // If the source has completed, complete the destination
      if (isSourceComplete) {
        destinationSubscriber.complete();
      }
    };

    /**
     * Handles completion of the inner observable.
     */
    const handleInnerComplete = () => {
      innerSubscription = null;
      if (isSourceComplete) {
        destinationSubscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iNA.createOperatorSubscriber(
        destinationSubscriber,
        function handleSourceNext(sourceValue) {
          hasPendingValue = true;
          latestValue = sourceValue;

          // If there is no active inner subscription, create one
          if (!innerSubscription) {
            const innerObservable = wT9.innerFrom(mapInteractionEntriesToRouteNames(sourceValue));
            innerSubscription = innerObservable.subscribe(
              iNA.createOperatorSubscriber(
                destinationSubscriber,
                handleInnerNext,
                handleInnerComplete
              )
            );
          }
        },
        function handleSourceComplete() {
          isSourceComplete = true;
          // If there is no pending value or no active inner subscription or the inner is closed, complete
          if (!hasPendingValue || !innerSubscription || innerSubscription.closed) {
            destinationSubscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = mapInteractionEntriesToRouteNamesOperator;