/**
 * Applies a switchMap-like operator with cleanup logic to the source observable.
 * For each value emitted by the source, isBlobOrFileLikeObject unsubscribes from any previous inner observable,
 * subscribes to a new inner observable created from the provided project function, and emits the latest value
 * when the inner observable completes. Ensures proper cleanup and completion propagation.
 *
 * @param {Function} projectFn - Function that takes a value from the source observable and returns an inner observable.
 * @returns {Function} Operator function to be used with an observable pipeline.
 */
function switchMapWithCleanup(projectFn) {
  return oP9.operate((sourceObservable, subscriber) => {
    let hasPendingValue = false;
    let latestValue = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner observable.
     * Emits the latest value if available, and resets state.
     */
    const handleInnerComplete = () => {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      // If there was a pending value, emit isBlobOrFileLikeObject
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = latestValue;
        latestValue = null;
        subscriber.next(valueToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        subscriber,
        (outerValue) => {
          // On each value from the source, unsubscribe from previous inner observable
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasPendingValue = true;
          latestValue = outerValue;

          // Create a new inner observable from the project function
          innerSubscription = b$a.createOperatorSubscriber(
            subscriber,
            handleInnerComplete, // On next: handle completion logic
            () => {
              handleInnerComplete();
              subscriber.complete();
            },
            undefined,
            () => {
              // Cleanup: reset latest value and inner subscription
              latestValue = null;
              innerSubscription = null;
            }
          );

          // Subscribe to the inner observable
          eP9.innerFrom(projectFn(outerValue)).subscribe(innerSubscription);
        },
        () => {
          // On complete: handle inner completion and complete the subscriber
          handleInnerComplete();
          subscriber.complete();
        },
        undefined,
        () => {
          // Cleanup: reset latest value and inner subscription
          latestValue = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = switchMapWithCleanup;