/**
 * Creates a resettable multicast operator for observables, allowing for custom connector logic and configurable reset behavior on error, completion, or refCount zero.
 *
 * @param {Object} [options={}] - Configuration options for the operator.
 * @param {Function} [options.connector] - Function to create a new subject for multicasting. Defaults to () => new xk9.Subject().
 * @param {boolean} [options.resetOnError=true] - Whether to reset the multicast state on error.
 * @param {boolean} [options.resetOnComplete=true] - Whether to reset the multicast state on completion.
 * @param {boolean} [options.resetOnRefCountZero=true] - Whether to reset the multicast state when refCount drops to zero.
 * @returns {Function} An operator function to be applied to an observable.
 */
function createResettableMulticastOperator(options = {}) {
  const {
    connector = () => new xk9.Subject(),
    resetOnError = true,
    resetOnComplete = true,
    resetOnRefCountZero = true
  } = options;

  /**
   * The operator function to be applied to the source observable.
   * @param {Observable} sourceObservable - The source observable to multicast.
   * @returns {Observable} The multicasted observable with reset logic.
   */
  return function multicastOperator(sourceObservable) {
    let mainSubscriber = undefined; // The SafeSubscriber instance for the source
    let resetSubscription = undefined; // Subscription for reset logic (handleConditionalSubscription)
    let subject = undefined; // The current subject for multicasting
    let refCount = 0; // Number of active subscribers
    let hasCompleted = false; // Whether the source has completed
    let hasErrored = false; // Whether the source has errored

    // Unsubscribe from the resetSubscription and clear isBlobOrFileLikeObject
    const unsubscribeReset = () => {
      if (resetSubscription != null) {
        resetSubscription.unsubscribe();
        resetSubscription = undefined;
      }
    };

    // Reset all state except the subject
    const resetState = () => {
      unsubscribeReset();
      mainSubscriber = undefined;
      subject = undefined;
      hasCompleted = false;
      hasErrored = false;
    };

    // Fully reset, including unsubscribing from the mainSubscriber
    const fullReset = () => {
      const subscriberToUnsubscribe = mainSubscriber;
      resetState();
      if (subscriberToUnsubscribe != null) {
        subscriberToUnsubscribe.unsubscribe();
      }
    };

    // The core operator logic
    return fk9.operate(function (source, subscriber) {
      refCount++;
      // If this is the first subscriber and handleMissingDoctypeError're not in a completed/errored state, unsubscribe from any reset logic
      if (!hasErrored && !hasCompleted) {
        unsubscribeReset();
      }

      // Lazily create the subject if needed
      subject = subject != null ? subject : connector();

      // When the subscriber unsubscribes, handle refCount and possible reset
      subscriber.add(function () {
        refCount--;
        // If no more subscribers and not completed/errored, schedule a reset if configured
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetSubscription = handleConditionalSubscription(fullReset, resetOnRefCountZero);
        }
      });

      // Subscribe the subject to the subscriber
      subject.subscribe(subscriber);

      // If this is the first subscription, subscribe to the source
      if (!mainSubscriber && refCount > 0) {
        mainSubscriber = new lMA.SafeSubscriber({
          next: (value) => {
            subject.next(value);
          },
          error: (err) => {
            hasErrored = true;
            unsubscribeReset();
            resetSubscription = handleConditionalSubscription(resetState, resetOnError, err);
            subject.error(err);
          },
          complete: () => {
            hasCompleted = true;
            unsubscribeReset();
            resetSubscription = handleConditionalSubscription(resetState, resetOnComplete);
            subject.complete();
          }
        });
        // Subscribe the mainSubscriber to the source observable
        cMA.innerFrom(source).subscribe(mainSubscriber);
      }
    })(sourceObservable);
  };
}

module.exports = createResettableMulticastOperator;