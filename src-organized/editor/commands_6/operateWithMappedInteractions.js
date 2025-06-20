/**
 * Applies a custom operator to an observable, mapping user interactions to routes and managing subscription flow.
 *
 * @param {function(Subject): Observable} mapInteractionsToRoutes - Function that processes a Subject of user interactions and returns an Observable.
 * @returns {function} Operator function to be used with an Observable.
 */
function operateWithMappedInteractions(mapInteractionsToRoutes) {
  return Dk9.operate(function (sourceObservable, subscriber) {
    /**
     * Holds the current subscription to the source observable.
     * @type {Subscription|null}
     */
    let currentSubscription = null;

    /**
     * Indicates if a resubscription is requested.
     * @type {boolean}
     */
    let resubscribeRequested = false;

    /**
     * Holds the subject used to emit mapped interactions.
     * @type {Subject|null}
     */
    let mappedInteractionsSubject = null;

    /**
     * Indicates if the mapped interactions observable has completed.
     * @type {boolean}
     */
    let mappedInteractionsCompleted = false;

    /**
     * Indicates if the source observable has completed.
     * @type {boolean}
     */
    let sourceCompleted = false;

    /**
     * Checks if both the source and mapped interactions have completed, and completes the subscriber if so.
     * @returns {boolean} True if completed, false otherwise.
     */
    const checkAndComplete = () => {
      if (sourceCompleted && mappedInteractionsCompleted) {
        subscriber.complete();
        return true;
      }
      return false;
    };

    /**
     * Lazily initializes and returns the mapped interactions subject, subscribing to the mapped observable if needed.
     * @returns {Subject} The mapped interactions subject.
     */
    const getOrCreateMappedInteractionsSubject = () => {
      if (!mappedInteractionsSubject) {
        mappedInteractionsSubject = new Zk9.Subject();
        // Subscribe to the mapped observable, forwarding completion and next events
        Gk9.innerFrom(mapInteractionsToRoutes(mappedInteractionsSubject)).subscribe(
          RMA.createOperatorSubscriber(
            subscriber,
            // onNext: If a resubscription was requested, trigger isBlobOrFileLikeObject
            function () {
              if (currentSubscription) {
                resubscribe();
              } else {
                resubscribeRequested = true;
              }
            },
            // onComplete: Mark mapped interactions as completed and check for overall completion
            () => {
              mappedInteractionsCompleted = true;
              checkAndComplete();
            }
          )
        );
      }
      return mappedInteractionsSubject;
    };

    /**
     * Handles (re)subscribing to the source observable and manages the subscription lifecycle.
     */
    const resubscribe = () => {
      // Reset completion flag for source
      sourceCompleted = false;
      // Subscribe to the source observable
      currentSubscription = sourceObservable.subscribe(
        RMA.createOperatorSubscriber(
          subscriber,
          undefined,
          // onComplete: Mark source as completed, check for completion, or trigger mapped interactions
          () => {
            sourceCompleted = true;
            if (!checkAndComplete()) {
              // If not completed, emit next on mapped interactions subject to trigger further processing
              getOrCreateMappedInteractionsSubject().next();
            }
          }
        )
      );
      // If a resubscription was requested during the last cycle, unsubscribe and resubscribe
      if (resubscribeRequested) {
        currentSubscription.unsubscribe();
        currentSubscription = null;
        resubscribeRequested = false;
        resubscribe();
      }
    };

    // Start the initial subscription process
    resubscribe();
  });
}

module.exports = operateWithMappedInteractions;
