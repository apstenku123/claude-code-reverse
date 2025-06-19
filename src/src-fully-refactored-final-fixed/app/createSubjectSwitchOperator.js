/**
 * Creates an operator that emits a Subject as an observable, forwards values from the source,
 * and switches to a new Subject when the inner observable emits. Handles completion and errors.
 *
 * @param {Observable<any>} sourceObservable - The source observable to switch from.
 * @returns {OperatorFunction<any, Observable<any>>} An operator function for use with RxJS pipe.
 */
function createSubjectSwitchOperator(sourceObservable) {
  return oy9.operate(function (outerObservable, subscriber) {
    // Create a new Subject to emit values
    let currentSubject = new vLA.Subject();
    // Emit the Subject as an observable to the subscriber
    subscriber.next(currentSubject.asObservable());

    // Error handler that propagates errors to both the Subject and the subscriber
    const handleError = function (error) {
      currentSubject.error(error);
      subscriber.error(error);
    };

    // Subscribe to the outer observable, forwarding values to the current Subject
    const outerSubscription = outerObservable.subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Forward value to the current Subject
          if (currentSubject) {
            currentSubject.next(value);
          }
        },
        function () {
          // Complete both the Subject and the subscriber when outer completes
          currentSubject.complete();
          subscriber.complete();
        },
        handleError
      )
    );

    // Subscribe to the inner observable created from the sourceObservable
    const innerSubscription = ey9.innerFrom(sourceObservable).subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        function () {
          // On emission, complete the current Subject and emit a new one
          currentSubject.complete();
          currentSubject = new vLA.Subject();
          subscriber.next(currentSubject.asObservable());
        },
        ty9.noop, // No-op for completion
        handleError
      )
    );

    // Return the teardown logic to unsubscribe and clean up
    return function () {
      if (currentSubject) {
        currentSubject.unsubscribe();
        currentSubject = null;
      }
    };
  });
}

module.exports = createSubjectSwitchOperator;