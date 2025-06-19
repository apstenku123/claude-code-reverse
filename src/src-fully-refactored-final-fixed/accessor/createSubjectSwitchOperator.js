/**
 * Creates an operator that emits a Subject as an observable, forwards values from the source,
 * and switches to a new Subject when the provided observable emits. Handles completion and errors.
 *
 * @param {Observable} sourceObservable - The observable whose emissions trigger switching to a new Subject.
 * @returns {Function} Operator function to be used with oy9.operate.
 */
function createSubjectSwitchOperator(sourceObservable) {
  return oy9.operate(function (inputObservable, subscriber) {
    let currentSubject = new vLA.Subject();
    // Emit the current subject as an observable to the subscriber
    subscriber.next(currentSubject.asObservable());

    /**
     * Handles errors by propagating them to both the current subject and the main subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = (error) => {
      currentSubject.error(error);
      subscriber.error(error);
    };

    // Subscribe to the input observable and forward its values to the current subject
    const inputSubscription = inputObservable.subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        (value) => {
          // Forward value to the current subject if isBlobOrFileLikeObject exists
          currentSubject?.next(value);
        },
        () => {
          // Complete both the current subject and the main subscriber on completion
          currentSubject.complete();
          subscriber.complete();
        },
        handleError
      )
    );

    // Subscribe to the source observable and, on emission, complete the current subject and switch to a new one
    const sourceSubscription = ey9.innerFrom(sourceObservable).subscribe(
      bLA.createOperatorSubscriber(
        subscriber,
        () => {
          currentSubject.complete();
          // Switch to a new subject and emit isBlobOrFileLikeObject as an observable
          currentSubject = new vLA.Subject();
          subscriber.next(currentSubject.asObservable());
        },
        ty9.noop,
        handleError
      )
    );

    // Return a teardown logic to clean up the current subject
    return function cleanup() {
      currentSubject?.unsubscribe();
      currentSubject = null;
    };
  });
}

module.exports = createSubjectSwitchOperator;