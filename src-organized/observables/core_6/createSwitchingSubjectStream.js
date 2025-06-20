/**
 * Creates an operator that, for each subscription, emits a new Subject as an Observable.
 * All values from the source Observable are forwarded to the current Subject.
 * When the provided factory function emits a new Observable, the previous Subject is completed and replaced.
 * Handles errors and completion appropriately, cleaning up resources.
 *
 * @param {Function} sourceObservableFactory - a function that returns an Observable to switch to.
 * @returns {Function} An operator function to be used with an Observable.
 */
function createSwitchingSubjectStream(sourceObservableFactory) {
  return Nx9.operate(function (sourceObservable, subscriber) {
    let currentSubject = null;
    let innerSubscription = null;

    /**
     * Handles errors by forwarding to both the current Subject and the main subscriber.
     * @param {any} error - The error to forward.
     */
    const handleError = (error) => {
      if (currentSubject) {
        currentSubject.error(error);
      }
      subscriber.error(error);
    };

    /**
     * Switches to a new Subject and subscribes to the Observable returned by the factory.
     * Cleans up previous subscriptions and handles errors.
     */
    const switchToNewSubject = () => {
      // Unsubscribe from previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription) {
        innerSubscription.unsubscribe();
      }
      // Complete the previous subject if isBlobOrFileLikeObject exists
      if (currentSubject) {
        currentSubject.complete();
      }
      // Create a new Subject and emit its Observable to the subscriber
      currentSubject = new Ux9.Subject();
      subscriber.next(currentSubject.asObservable());

      let innerObservable;
      try {
        // Get the new Observable to subscribe to
        innerObservable = $getProjectSubscriptionConfig.innerFrom(sourceObservableFactory());
      } catch (error) {
        handleError(error);
        return;
      }
      // Subscribe to the new Observable, reswitching on complete or error
      innerSubscription = iLA.createOperatorSubscriber(
        subscriber,
        switchToNewSubject, // On next: switch again
        switchToNewSubject, // On complete: switch again
        handleError // On error
      );
      innerObservable.subscribe(innerSubscription);
    };

    // Start by switching to the first Subject
    switchToNewSubject();

    // Subscribe to the source Observable, forwarding values to the current Subject
    sourceObservable.subscribe(
      iLA.createOperatorSubscriber(
        subscriber,
        (value) => {
          if (currentSubject) {
            currentSubject.next(value);
          }
        },
        () => {
          if (currentSubject) {
            currentSubject.complete();
          }
          subscriber.complete();
        },
        handleError,
        () => {
          // Cleanup on unsubscribe
          if (innerSubscription) {
            innerSubscription.unsubscribe();
          }
          currentSubject = null;
        }
      )
    );
  });
}

module.exports = createSwitchingSubjectStream;