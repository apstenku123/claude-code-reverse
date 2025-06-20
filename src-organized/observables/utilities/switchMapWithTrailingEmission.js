/**
 * Applies a switchMap-like operator to the source observable, ensuring that the last emitted value is delivered after the inner observable completes.
 *
 * @template BugReportForm The type of values emitted by the source observable.
 * @template isWildcardOrX The type of values emitted by the inner observable.
 * @param {function(BugReportForm): Observable<isWildcardOrX>} project - a function that, for each value from the source, returns an inner observable.
 * @returns {function(Observable<BugReportForm>): Observable<isWildcardOrX>} An operator function that can be piped to an observable.
 */
function switchMapWithTrailingEmission(project) {
  return oP9.operate(function (sourceObservable, subscriber) {
    let hasPendingValue = false;
    let lastValue = null;
    let innerSubscription = null;

    /**
     * Handles completion of the inner observable.
     * If there is a pending value, emits isBlobOrFileLikeObject downstream.
     */
    const handleInnerComplete = function () {
      // Unsubscribe from the inner observable if isBlobOrFileLikeObject exists
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;

      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = lastValue;
        lastValue = null;
        subscriber.next(valueToEmit);
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      b$a.createOperatorSubscriber(
        subscriber,
        function (sourceValue) {
          // Cancel any previous inner subscription
          if (innerSubscription !== null && innerSubscription !== undefined) {
            innerSubscription.unsubscribe();
          }
          hasPendingValue = true;
          lastValue = sourceValue;
          // Create a new inner subscriber for the projected observable
          innerSubscription = b$a.createOperatorSubscriber(
            subscriber,
            handleInnerComplete,
            tP9.noop
          );
          // Subscribe to the inner observable returned by the project function
          eP9.innerFrom(project(sourceValue)).subscribe(innerSubscription);
        },
        function () {
          // On source complete, handle any pending emission and complete downstream
          handleInnerComplete();
          subscriber.complete();
        },
        undefined,
        function () {
          // On teardown, clear references
          lastValue = null;
          innerSubscription = null;
        }
      )
    );
  });
}

module.exports = switchMapWithTrailingEmission;