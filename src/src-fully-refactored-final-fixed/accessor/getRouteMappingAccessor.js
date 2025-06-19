/**
 * Creates an accessor operator that manages the mapping of user interactions to routes.
 * This operator subscribes to a source observable, processes interaction events,
 * and completes when all processing is done. It ensures correct sequencing and
 * handles re-entrancy and completion logic.
 *
 * @param {function} mapInteractionsToRoutes - Function that processes an observable of events and returns a mapped observable.
 * @returns {function} Operator function to be used with an observable pipeline.
 */
function getRouteMappingAccessor(mapInteractionsToRoutes) {
  return Dk9.operate(function (config, subscription) {
    let activeSubscription = null;
    let shouldRestart = false;
    let subjectInstance = null;
    let isSourceCompleted = false;
    let isInnerCompleted = false;

    /**
     * Checks if both the source and inner observables have completed.
     * If so, completes the downstream subscription.
     * @returns {boolean} True if completed, false otherwise.
     */
    const checkCompletion = function () {
      if (isInnerCompleted && isSourceCompleted) {
        subscription.complete();
        return true;
      }
      return false;
    };

    /**
     * Lazily creates the subject and subscribes to the mapped observable.
     * Returns the subject instance for emitting values.
     * @returns {Subject} The subject instance.
     */
    const getOrCreateSubject = function () {
      if (!subjectInstance) {
        subjectInstance = new Zk9.Subject();
        Gk9.innerFrom(mapInteractionsToRoutes(subjectInstance)).subscribe(
          RMA.createOperatorSubscriber(
            subscription,
            // next handler
            function () {
              if (activeSubscription) {
                restartSubscription();
              } else {
                shouldRestart = true;
              }
            },
            // complete handler
            function () {
              isInnerCompleted = true;
              checkCompletion();
            }
          )
        );
      }
      return subjectInstance;
    };

    /**
     * Subscribes to the source observable and manages re-entrancy.
     * Handles completion and triggers the subject as needed.
     */
    const restartSubscription = function () {
      isSourceCompleted = false;
      activeSubscription = config.subscribe(
        RMA.createOperatorSubscriber(
          subscription,
          undefined,
          // complete handler
          function () {
            isSourceCompleted = true;
            // If not completed, emit next on the subject to trigger inner logic
            if (!checkCompletion()) {
              getOrCreateSubject().next();
            }
          }
        )
      );
      // If a restart was requested during the previous run, unsubscribe and restart
      if (shouldRestart) {
        activeSubscription.unsubscribe();
        activeSubscription = null;
        shouldRestart = false;
        restartSubscription();
      }
    };

    // Start the subscription chain
    restartSubscription();
  });
}

module.exports = getRouteMappingAccessor;