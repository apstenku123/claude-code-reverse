/**
 * Applies a switchMap-like operator to the source observable, mapping each emitted value
 * to a new inner observable created by the provided mapping function. Ensures that only the latest
 * inner observable is active, and handles completion and unsubscription logic.
 *
 * @param {function(any): Observable} mapToInnerObservable - Function that maps each value from the source observable to an inner observable.
 * @returns {function(Observable): Observable} Operator function to be used with an observable pipeline.
 */
function switchMapWithCompletion(mapToInnerObservable) {
  return zT9.operate(function (sourceObservable, destinationSubscriber) {
    let hasActiveInner = false;
    let latestValue = null;
    let innerSubscription = null;
    let sourceCompleted = false;

    /**
     * Handles the completion of the inner observable.
     * If the source has completed and there is no active inner, complete the destination.
     */
    const handleInnerComplete = function () {
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;
      if (hasActiveInner) {
        hasActiveInner = false;
        const valueToEmit = latestValue;
        latestValue = null;
        destinationSubscriber.next(valueToEmit);
      }
      if (sourceCompleted) {
        destinationSubscriber.complete();
      }
    };

    /**
     * Handles the case where the inner observable completes without emitting.
     * If the source has completed, complete the destination.
     */
    const handleInnerFinalize = function () {
      innerSubscription = null;
      if (sourceCompleted) {
        destinationSubscriber.complete();
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      iNA.createOperatorSubscriber(
        destinationSubscriber,
        function (outerValue) {
          // When a new value arrives from the source, switch to a new inner observable
          hasActiveInner = true;
          latestValue = outerValue;
          if (!innerSubscription) {
            // Subscribe to the inner observable generated from the mapping function
            wT9.innerFrom(mapToInnerObservable(outerValue)).subscribe(
              innerSubscription = iNA.createOperatorSubscriber(
                destinationSubscriber,
                handleInnerComplete,
                handleInnerFinalize
              )
            );
          }
        },
        function () {
          // Source observable has completed
          sourceCompleted = true;
          // If there is no active inner or the inner is closed, complete the destination
          if (!hasActiveInner || !innerSubscription || innerSubscription.closed) {
            destinationSubscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = switchMapWithCompletion;