/**
 * Creates a connectable multicast accessor function that manages subscription lifecycles and resets
 * based on error, completion, or reference count. Useful for sharing a source Observable among multiple subscribers
 * with custom reset and connector logic.
 *
 * @param {Object} [options={}] - Configuration options for the accessor.
 * @param {Function} [options.connector] - Factory function to create a new Subject (or similar) for multicasting.
 * @param {boolean} [options.resetOnError=true] - Whether to reset on error.
 * @param {boolean} [options.resetOnComplete=true] - Whether to reset on completion.
 * @param {boolean} [options.resetOnRefCountZero=true] - Whether to reset when reference count drops to zero.
 * @returns {Function} - a function that takes a source Observable and returns a multicast Observable.
 */
function createConnectableMulticastAccessor(options = {}) {
  const {
    connector = () => new xk9.Subject(),
    resetOnError = true,
    resetOnComplete = true,
    resetOnRefCountZero = true
  } = options;

  /**
   * The returned function takes a source Observable and returns a multicast Observable
   * that manages its own subscription and reset logic.
   *
   * @param {Observable} sourceObservable - The source Observable to multicast.
   * @returns {Observable} - The multicast Observable.
   */
  return function multicastOperator(sourceObservable) {
    let mainSubscription; // Subscription to the source observable
    let resetTimerSubscription; // Subscription for reset timer
    let subject; // The subject used for multicasting
    let refCount = 0; // Number of active subscribers
    let hasCompleted = false; // Whether the source has completed
    let hasErrored = false; // Whether the source has errored

    // Unsubscribe from the reset timer
    const clearResetTimer = () => {
      if (resetTimerSubscription) {
        resetTimerSubscription.unsubscribe();
        resetTimerSubscription = undefined;
      }
    };

    // Reset all state and subject
    const resetState = () => {
      clearResetTimer();
      mainSubscription = undefined;
      subject = undefined;
      hasCompleted = false;
      hasErrored = false;
    };

    // Unsubscribe from source and reset all state
    const unsubscribeAndReset = () => {
      const subscriptionToUnsubscribe = mainSubscription;
      resetState();
      if (subscriptionToUnsubscribe) {
        subscriptionToUnsubscribe.unsubscribe();
      }
    };

    // The actual operator logic
    return fk9.operate(function (source, subscriber) {
      refCount++;
      // If this is the first subscriber after completion/error, clear any reset timer
      if (!hasErrored && !hasCompleted) {
        clearResetTimer();
      }

      // Create the subject if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
      subject = subject ?? connector();

      // When this subscriber unsubscribes, check if handleMissingDoctypeError should reset
      subscriber.add(function () {
        refCount--;
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          // Schedule a reset if configured to do so when refCount drops to zero
          resetTimerSubscription = handleConditionalSubscription(unsubscribeAndReset, resetOnRefCountZero);
        }
      });

      // Subscribe this subscriber to the subject
      subject.subscribe(subscriber);

      // If there is no main subscription and there is at least one subscriber, subscribe to the source
      if (!mainSubscription && refCount > 0) {
        mainSubscription = new lMA.SafeSubscriber({
          next: (value) => subject.next(value),
          error: (err) => {
            hasErrored = true;
            clearResetTimer();
            // Schedule a reset if configured to do so on error
            resetTimerSubscription = handleConditionalSubscription(resetState, resetOnError, err);
            subject.error(err);
          },
          complete: () => {
            hasCompleted = true;
            clearResetTimer();
            // Schedule a reset if configured to do so on complete
            resetTimerSubscription = handleConditionalSubscription(resetState, resetOnComplete);
            subject.complete();
          }
        });
        cMA.innerFrom(source).subscribe(mainSubscription);
      }
    })(sourceObservable);
  };
}

module.exports = createConnectableMulticastAccessor;