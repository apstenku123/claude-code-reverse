/**
 * Creates an observable that emits a new subject for each invocation of the provided source observable factory.
 * Each subject emits values from the outer observable until the inner observable completes or errors.
 *
 * @param {Function} sourceObservableFactory - a function that returns an observable to subscribe to.
 * @returns {Observable} An observable that emits subjects, each representing a new subscription cycle.
 */
function createInteractionObservable(sourceObservableFactory) {
  return Nx9.operate(function (outerObservable, subscriber) {
    let currentSubject = null;
    let innerSubscription = null;

    /**
     * Handles errors by propagating them to both the current subject and the main subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = (error) => {
      if (currentSubject) {
        currentSubject.error(error);
      }
      subscriber.error(error);
    };

    /**
     * Starts a new subscription cycle by creating a new subject and subscribing to the inner observable.
     */
    const startNewCycle = () => {
      // Unsubscribe from previous inner observable if exists
      if (innerSubscription) {
        innerSubscription.unsubscribe();
      }
      // Complete previous subject if exists
      if (currentSubject) {
        currentSubject.complete();
      }
      // Create a new subject for the new cycle
      currentSubject = new Ux9.Subject();
      // Emit the new subject as an observable to the main subscriber
      subscriber.next(currentSubject.asObservable());

      let innerObservable;
      try {
        // Create the inner observable from the factory
        innerObservable = $getProjectSubscriptionConfig.innerFrom(sourceObservableFactory());
      } catch (error) {
        handleError(error);
        return;
      }
      // Subscribe to the inner observable
      innerSubscription = iLA.createOperatorSubscriber(
        subscriber,
        startNewCycle, // On next: start a new cycle
        startNewCycle, // On complete: start a new cycle
        handleError    // On error: handle error
      );
      innerObservable.subscribe(innerSubscription);
    };

    // Start the first subscription cycle
    startNewCycle();

    // Subscribe to the outer observable
    outerObservable.subscribe(
      iLA.createOperatorSubscriber(
        subscriber,
        (value) => {
          // Forward values from the outer observable to the current subject
          if (currentSubject) {
            currentSubject.next(value);
          }
        },
        () => {
          // Complete both the current subject and the main subscriber
          if (currentSubject) {
            currentSubject.complete();
          }
          subscriber.complete();
        },
        handleError,
        () => {
          // Cleanup: unsubscribe from inner observable and reset current subject
          if (innerSubscription) {
            innerSubscription.unsubscribe();
          }
          currentSubject = null;
        }
      )
    );
  });
}

module.exports = createInteractionObservable;