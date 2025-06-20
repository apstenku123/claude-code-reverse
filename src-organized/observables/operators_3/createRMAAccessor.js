/**
 * Creates an accessor that maps user interactions to route names and manages their lifecycle.
 *
 * This function wraps the provided mapping function (mapInteractionsToRouteNames) into an operator
 * that can be used with observables. It ensures that mapping and completion logic are handled correctly,
 * including re-subscribing and managing completion state.
 *
 * @param {function(Subject): Observable} mapInteractionsToRouteNames - Function that processes a Subject and returns an Observable.
 * @returns {function} Operator function to be used with observables.
 */
function createRMAAccessor(mapInteractionsToRouteNames) {
  return Dk9.operate(function (config, subscription) {
    /**
     * Holds the current inner subscription.
     * @type {Subscription|null}
     */
    let innerSubscription = null;

    /**
     * Indicates if a resubscription is requested.
     * @type {boolean}
     */
    let resubscribeRequested = false;

    /**
     * Holds the subject used for mapping interactions.
     * @type {Zk9.Subject|null}
     */
    let mappingSubject = null;

    /**
     * Indicates if the mapping process has completed.
     * @type {boolean}
     */
    let mappingCompleted = false;

    /**
     * Indicates if the outer observable has completed.
     * @type {boolean}
     */
    let outerCompleted = false;

    /**
     * Checks if both the outer observable and mapping process have completed.
     * If so, completes the subscription.
     * @returns {boolean} True if completed, false otherwise.
     */
    const checkAndComplete = () => {
      if (outerCompleted && mappingCompleted) {
        subscription.complete();
        return true;
      }
      return false;
    };

    /**
     * Lazily initializes and returns the mapping subject.
     * Also subscribes to the observable returned by mapInteractionsToRouteNames.
     * @returns {Zk9.Subject} The mapping subject.
     */
    const getOrCreateMappingSubject = () => {
      if (!mappingSubject) {
        mappingSubject = new Zk9.Subject();
        // Subscribe to the mapped observable, handling next and complete
        Gk9.innerFrom(mapInteractionsToRouteNames(mappingSubject)).subscribe(
          RMA.createOperatorSubscriber(
            subscription,
            // On next
            () => {
              if (innerSubscription) {
                // If handleMissingDoctypeError have an inner subscription, trigger resubscription
                resubscribe();
              } else {
                resubscribeRequested = true;
              }
            },
            // On complete
            () => {
              mappingCompleted = true;
              checkAndComplete();
            }
          )
        );
      }
      return mappingSubject;
    };

    /**
     * Handles (re-)subscribing to the outer observable.
     * If a resubscription is requested, unsubscribes and resubscribes.
     */
    const resubscribe = () => {
      // Reset outer completed state
      outerCompleted = false;
      // Subscribe to the outer observable
      innerSubscription = config.subscribe(
        RMA.createOperatorSubscriber(
          subscription,
          undefined,
          // On complete
          () => {
            outerCompleted = true;
            // If not completed, trigger the mapping subject to emit
            if (!checkAndComplete()) {
              getOrCreateMappingSubject().next();
            }
          }
        )
      );
      // If a resubscription was requested during the mapping, handle isBlobOrFileLikeObject
      if (resubscribeRequested) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
        resubscribeRequested = false;
        resubscribe();
      }
    };

    // Start the initial subscription
    resubscribe();
  });
}

module.exports = createRMAAccessor;