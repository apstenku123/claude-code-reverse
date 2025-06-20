/**
 * Creates an accessor operator that processes interaction entries, mapping them to route names and managing their lifecycle.
 * This operator manages subscription state, completion, and ensures deduplication and correct sequencing of route mapping.
 *
 * @param {function} mapInteractionEntriesToRouteNames - Function that processes an observable (Subject) of interaction entries and maps them to route names.
 * @returns {function} Operator function to be used with an observable pipeline.
 */
function createRouteNameAccessor(mapInteractionEntriesToRouteNames) {
  return Dk9.operate(function (config, subscription) {
    let innerSubscription = null; // Holds the current inner subscription
    let shouldRestart = false;    // Indicates if the inner subscription should be restarted
    let subject = null;           // Subject for interaction entries
    let isSourceComplete = false; // True if the source observable has completed
    let isInnerComplete = false;  // True if the inner observable has completed

    /**
     * Checks if both the source and inner observables have completed.
     * If so, completes the outer subscription.
     * @returns {boolean} True if completed, false otherwise.
     */
    const checkAndComplete = function () {
      if (isInnerComplete && isSourceComplete) {
        subscription.complete();
        return true;
      }
      return false;
    };

    /**
     * Lazily initializes the subject and subscribes to the mapped route names.
     * @returns {Subject} The subject for interaction entries.
     */
    const getOrCreateSubject = function () {
      if (!subject) {
        subject = new Zk9.Subject();
        // Subscribe to the mapped route names observable
        Gk9.innerFrom(mapInteractionEntriesToRouteNames(subject)).subscribe(
          RMA.createOperatorSubscriber(
            subscription,
            // Next handler: if innerSubscription exists, restart; else, flag for restart
            function () {
              if (innerSubscription) {
                restartInnerSubscription();
              } else {
                shouldRestart = true;
              }
            },
            // Complete handler: mark inner as complete and check for overall completion
            function () {
              isInnerComplete = true;
              checkAndComplete();
            }
          )
        );
      }
      return subject;
    };

    /**
     * (Re)starts the inner subscription to the source observable.
     * Handles completion and triggers subject emission if needed.
     */
    const restartInnerSubscription = function () {
      isSourceComplete = false;
      // Subscribe to the source observable
      innerSubscription = config.subscribe(
        RMA.createOperatorSubscriber(
          subscription,
          undefined,
          // Complete handler for the source observable
          function () {
            isSourceComplete = true;
            // If not completed, trigger the subject to emit
            if (!checkAndComplete()) {
              getOrCreateSubject().next();
            }
          }
        )
      );
      // If a restart was requested during the last cycle, unsubscribe and restart
      if (shouldRestart) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
        shouldRestart = false;
        restartInnerSubscription();
      }
    };

    // Start the first inner subscription
    restartInnerSubscription();
  });
}

module.exports = createRouteNameAccessor;