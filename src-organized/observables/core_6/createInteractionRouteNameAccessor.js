/**
 * Creates an accessor Observable that maps user interactions to route names and manages their lifecycle.
 *
 * This function operates on a source Observable factory, mapping each emission to a new Subject Observable.
 * It ensures proper subscription management, error handling, and completion propagation. When the source emits,
 * the value is forwarded to the current Subject. When the source completes, the Subject and the outer Observable complete.
 * If the source factory throws, errors are propagated to both the Subject and the outer Observable.
 *
 * @param {Function} mapInteractionsToRouteNames - a factory function that returns an Observable mapping user interactions to route names and context.
 * @returns {Observable<Observable>} An Observable that emits Observables of mapped interactions.
 */
function createInteractionRouteNameAccessor(mapInteractionsToRouteNames) {
  return Nx9.operate(function (config, subscription) {
    let currentSubject = null;
    let innerSubscription = null;

    /**
     * Handles errors by propagating them to both the current Subject and the outer subscription.
     * @param {any} error - The error to propagate.
     */
    const handleError = (error) => {
      if (currentSubject) currentSubject.error(error);
      subscription.error(error);
    };

    /**
     * Initializes a new Subject and subscribes to the Observable returned by the factory.
     * Handles errors thrown by the factory and manages the lifecycle of the inner subscription.
     */
    const initializeSubjectAndSubscribe = () => {
      // Clean up previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription) innerSubscription.unsubscribe();
      // Complete previous subject if isBlobOrFileLikeObject exists
      if (currentSubject) currentSubject.complete();

      // Create a new Subject for the next window
      currentSubject = new Ux9.Subject();
      // Emit the new Subject'createInteractionAccessor observable to the outer subscriber
      subscription.next(currentSubject.asObservable());

      let innerObservable;
      try {
        // Get a new Observable from the factory
        innerObservable = $getProjectSubscriptionConfig.innerFrom(mapInteractionsToRouteNames());
      } catch (factoryError) {
        handleError(factoryError);
        return;
      }

      // Subscribe to the new Observable, handling completion and errors
      innerSubscription = iLA.createOperatorSubscriber(
        subscription,
        initializeSubjectAndSubscribe, // On next: restart the window
        initializeSubjectAndSubscribe, // On complete: restart the window
        handleError // On error
      );
      innerObservable.subscribe(innerSubscription);
    };

    // Start the first window
    initializeSubjectAndSubscribe();

    // Subscribe to the config Observable
    config.subscribe(
      iLA.createOperatorSubscriber(
        subscription,
        (interaction) => {
          // Forward each interaction to the current subject
          if (currentSubject) currentSubject.next(interaction);
        },
        () => {
          // Complete both the current subject and the outer subscription
          if (currentSubject) currentSubject.complete();
          subscription.complete();
        },
        handleError,
        () => {
          // Cleanup on unsubscribe
          if (innerSubscription) innerSubscription.unsubscribe();
          currentSubject = null;
        }
      )
    );
  });
}

module.exports = createInteractionRouteNameAccessor;