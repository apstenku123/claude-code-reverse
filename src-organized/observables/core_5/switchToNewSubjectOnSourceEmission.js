/**
 * Creates an operator that emits a Subject as an observable to the subscriber, and switches to a new Subject each time the source observable emits.
 *
 * @param {Observable<any>} sourceObservable - The observable whose emissions trigger switching to a new Subject.
 * @returns {OperatorFunction<any, Observable<any>>} An operator function that emits Subjects as observables and manages their lifecycle.
 */
function switchToNewSubjectOnSourceEmission(sourceObservable) {
  return oy9.operate(function (inputObservable, subscriber) {
    // Create the initial Subject instance
    let currentSubject = new vLA.Subject();
    // Emit the initial Subject as an observable to the subscriber
    subscriber.next(currentSubject.asObservable());

    /**
     * Handles errors by propagating them to both the current Subject and the main subscriber.
     * @param {any} error - The error to propagate
     */
    const handleError = function (error) {
      currentSubject.error(error);
      subscriber.error(error);
    };

    // Subscribe to the input observable, forwarding values to the current Subject
    const inputSubscription = inputObservable.subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Forward value to the current Subject if isBlobOrFileLikeObject exists
          currentSubject?.next(value);
        },
        function () {
          // Complete both the current Subject and the main subscriber when input completes
          currentSubject.complete();
          subscriber.complete();
        },
        handleError
      )
    );

    // Subscribe to the source observable; on each emission, complete the current Subject and start a new one
    const sourceSubscription = ey9.innerFrom(sourceObservable).subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        function () {
          // Complete the current Subject
          currentSubject.complete();
          // Create and emit a new Subject as an observable
          currentSubject = new vLA.Subject();
          subscriber.next(currentSubject.asObservable());
        },
        ty9.noop, // No-op for complete
        handleError
      )
    );

    // Return a teardown function to clean up resources when unsubscribed
    return function () {
      currentSubject?.unsubscribe();
      currentSubject = null;
    };
  });
}

module.exports = switchToNewSubjectOnSourceEmission;