/**
 * Creates an accessor observable that maps user interactions to routes and manages their aggregation.
 *
 * This function sets up an observable pipeline that, for each subscription, emits a new subject representing
 * the mapped interactions. It handles errors, completion, and resource cleanup, and ensures that the mapping
 * and aggregation logic are reapplied on resubscription or source completion.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes user interaction entries and maps them to routes.
 * @returns {Function} An operator function to be used with an observable, emitting observables of mapped interactions.
 */
function createInteractionRouteAccessor(mapInteractionsToRoutes) {
  return Nx9.operate(function (sourceObservable, destinationSubscriber) {
    let mappedSubject = null;
    let innerSubscription = null;

    /**
     * Handles errors by propagating them to both the mapped subject and the destination subscriber.
     * @param {any} error - The error to propagate.
     */
    const handleError = (error) => {
      if (mappedSubject) mappedSubject.error(error);
      destinationSubscriber.error(error);
    };

    /**
     * Initializes or re-initializes the mapping and subscription logic.
     * Called on initial subscription and when the inner observable completes.
     */
    const initializeMapping = () => {
      // Clean up previous inner subscription if isBlobOrFileLikeObject exists
      if (innerSubscription) innerSubscription.unsubscribe();
      // Complete the previous subject if isBlobOrFileLikeObject exists
      if (mappedSubject) mappedSubject.complete();
      // Create a new subject for mapped interactions
      mappedSubject = new Ux9.Subject();
      // Emit the observable of the subject to the destination
      destinationSubscriber.next(mappedSubject.asObservable());
      let mappedObservable;
      try {
        // Convert the mapping function'createInteractionAccessor result to an observable
        mappedObservable = $getProjectSubscriptionConfig.innerFrom(mapInteractionsToRoutes());
      } catch (error) {
        handleError(error);
        return;
      }
      // Subscribe to the mapped observable, re-initializing on complete/error
      mappedObservable.subscribe(
        innerSubscription = iLA.createOperatorSubscriber(
          destinationSubscriber,
          initializeMapping, // next: re-initialize on each emission
          initializeMapping, // complete: re-initialize
          handleError // error: propagate
        )
      );
    };

    // Start the mapping and subscription process
    initializeMapping();

    // Subscribe to the source observable, forwarding values to the mapped subject
    sourceObservable.subscribe(
      iLA.createOperatorSubscriber(
        destinationSubscriber,
        (value) => {
          if (mappedSubject) mappedSubject.next(value);
        },
        () => {
          if (mappedSubject) mappedSubject.complete();
          destinationSubscriber.complete();
        },
        handleError,
        () => {
          // Cleanup on unsubscribe
          if (innerSubscription) innerSubscription.unsubscribe();
          mappedSubject = null;
        }
      )
    );
  });
}

module.exports = createInteractionRouteAccessor;