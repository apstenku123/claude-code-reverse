/**
 * Creates an operator that manages route metadata access and completion logic for observables.
 *
 * @param {function(Subject): Observable} processInteractionEntries - Function that processes interaction entries and returns an observable.
 * @returns {function(Observable, Subscriber): void} Operator function to be used with observables.
 */
function getRouteMetadataAccessor(processInteractionEntries) {
  return Dk9.operate(function (config, subscription) {
    let innerSubscription = null;
    let shouldRestart = false;
    let subjectInstance = null;
    let isProcessComplete = false;
    let isSourceComplete = false;

    /**
     * Checks if both the source and process are complete, and completes the subscription if so.
     * @returns {boolean} True if completed, false otherwise.
     */
    const checkAndComplete = function () {
      if (isSourceComplete && isProcessComplete) {
        subscription.complete();
        return true;
      }
      return false;
    };

    /**
     * Lazily initializes the subject and subscribes to the processInteractionEntries observable.
     * @returns {Subject} The subject instance.
     */
    const getOrCreateSubject = function () {
      if (!subjectInstance) {
        subjectInstance = new Zk9.Subject();
        Gk9.innerFrom(processInteractionEntries(subjectInstance)).subscribe(
          RMA.createOperatorSubscriber(
            subscription,
            // next handler
            () => {
              if (innerSubscription) {
                restartSource();
              } else {
                shouldRestart = true;
              }
            },
            // complete handler
            () => {
              isProcessComplete = true;
              checkAndComplete();
            }
          )
        );
      }
      return subjectInstance;
    };

    /**
     * Subscribes to the source observable, manages completion and restart logic.
     */
    const restartSource = function () {
      isSourceComplete = false;
      innerSubscription = config.subscribe(
        RMA.createOperatorSubscriber(
          subscription,
          undefined,
          // complete handler
          () => {
            isSourceComplete = true;
            // If not yet complete, trigger next on the subject to continue
            if (!checkAndComplete()) {
              getOrCreateSubject().next();
            }
          }
        )
      );
      // If a restart was requested during the previous subscription, handle isBlobOrFileLikeObject
      if (shouldRestart) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
        shouldRestart = false;
        restartSource();
      }
    };

    // Start the process by subscribing to the source
    restartSource();
  });
}

module.exports = getRouteMetadataAccessor;