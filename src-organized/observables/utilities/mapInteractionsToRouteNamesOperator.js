/**
 * Operator that maps each emission from the source observable to a new observable
 * using the provided mapping function (mapInteractionsToRouteNames), and emits the latest value.
 * Ensures only the most recent inner observable'createInteractionAccessor value is emitted, and handles completion logic.
 *
 * @param {Function} mapInteractionsToRouteNames - Function that maps an emitted value to an observable.
 * @returns {Function} Operator function to be used with an observable.
 */
function mapInteractionsToRouteNamesOperator(mapInteractionsToRouteNames) {
  return zT9.operate(function (sourceObservable, subscriber) {
    let hasPendingInner = false;
    let latestInnerValue = null;
    let innerSubscription = null;
    let sourceCompleted = false;

    /**
     * Handles emission from the inner observable.
     * Unsubscribes from the inner, emits the latest value, and completes if needed.
     */
    const handleInnerNext = () => {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      if (hasPendingInner) {
        hasPendingInner = false;
        const valueToEmit = latestInnerValue;
        latestInnerValue = null;
        subscriber.next(valueToEmit);
      }
      // If the source has completed and there are no more inner observables, complete the subscriber
      if (sourceCompleted) {
        subscriber.complete();
      }
    };

    /**
     * Handles completion of the inner observable.
     * If the source has completed, completes the subscriber.
     */
    const handleInnerComplete = () => {
      innerSubscription = null;
      if (sourceCompleted) {
        subscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iNA.createOperatorSubscriber(
        subscriber,
        /**
         * Handles each value emitted by the source observable.
         * Starts a new inner observable using the mapping function.
         * @param {*} emittedValue - Value emitted by the source observable.
         */
        function (emittedValue) {
          hasPendingInner = true;
          latestInnerValue = emittedValue;
          // If there is no active inner subscription, create one
          if (!innerSubscription) {
            const innerObservable = wT9.innerFrom(mapInteractionsToRouteNames(emittedValue));
            innerSubscription = innerObservable.subscribe(
              iNA.createOperatorSubscriber(subscriber, handleInnerNext, handleInnerComplete)
            );
          }
        },
        /**
         * Handles completion of the source observable.
         * If there are no pending inner emissions or the inner is closed, completes the subscriber.
         */
        function () {
          sourceCompleted = true;
          if (!hasPendingInner || !innerSubscription || innerSubscription.closed) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = mapInteractionsToRouteNamesOperator;