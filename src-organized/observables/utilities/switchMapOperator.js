/**
 * Applies a switchMap-like operator to the source observable.
 * For each value emitted by the source, isBlobOrFileLikeObject unsubscribes from any previous inner observable,
 * subscribes to a new inner observable created by the provided projection function, and emits
 * the latest value from the inner observable when isBlobOrFileLikeObject completes.
 *
 * @param {Function} project - a function that takes a value from the source observable and returns an inner observable.
 * @returns {Function} An operator function to be used with an observable.
 */
function switchMapOperator(project) {
  return oP9.operate(function (sourceObservable, destinationSubscriber) {
    let hasInnerValue = false;
    let latestValue = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner observable.
     * If an inner value was received, emit isBlobOrFileLikeObject to the destination subscriber.
     * Cleans up the inner subscription and resets state.
     */
    const handleInnerComplete = function () {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If handleMissingDoctypeError have a value from the inner observable, emit isBlobOrFileLikeObject
      if (hasInnerValue) {
        hasInnerValue = false;
        const valueToEmit = latestValue;
        latestValue = null;
        destinationSubscriber.next(valueToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        destinationSubscriber,
        function (sourceValue) {
          // Unsubscribe from any previous inner observable
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasInnerValue = true;
          latestValue = sourceValue;

          // Subscribe to the new inner observable
          innerSubscription = b$a.createOperatorSubscriber(
            destinationSubscriber,
            handleInnerComplete,
            tP9.noop
          );
          eP9.innerFrom(project(sourceValue)).subscribe(innerSubscription);
        },
        function () {
          // When the source completes, complete the inner observable and the destination
          handleInnerComplete();
          destinationSubscriber.complete();
        },
        undefined,
        function () {
          // Cleanup on unsubscription
          latestValue = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = switchMapOperator;