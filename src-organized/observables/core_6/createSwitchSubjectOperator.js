/**
 * Creates an operator that emits a Subject as an observable to the subscriber, 
 * and switches to a new Subject each time the source observable emits.
 *
 * @param {Observable<any>} sourceObservable - The observable whose emissions trigger a new Subject.
 * @returns {Function} Operator function to be used with oy9.operate.
 */
function createSwitchSubjectOperator(sourceObservable) {
  return oy9.operate(function (inputObservable, subscriber) {
    // Create a new Subject to emit values
    let currentSubject = new vLA.Subject();
    // Emit the Subject as an observable to the subscriber
    subscriber.next(currentSubject.asObservable());

    /**
     * Handles errors by propagating them to both the current Subject and the subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = function (error) {
      currentSubject.error(error);
      subscriber.error(error);
    };

    // Subscribe to the input observable and forward its values to the current Subject
    const inputSubscription = inputObservable.subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        (value) => {
          // Forward value to the current Subject
          currentSubject?.next(value);
        },
        () => {
          // Complete both the current Subject and the subscriber when input completes
          currentSubject.complete();
          subscriber.complete();
        },
        handleError
      )
    );

    // Subscribe to the source observable; on each emission, complete the current Subject and emit a new one
    const sourceSubscription = ey9.innerFrom(sourceObservable).subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        () => {
          // Complete the current Subject
          currentSubject.complete();
          // Create and emit a new Subject
          currentSubject = new vLA.Subject();
          subscriber.next(currentSubject.asObservable());
        },
        ty9.noop,
        handleError
      )
    );

    // Return teardown logic to clean up the current Subject
    return function cleanup() {
      currentSubject?.unsubscribe();
      currentSubject = null;
    };
  });
}

module.exports = createSwitchSubjectOperator;