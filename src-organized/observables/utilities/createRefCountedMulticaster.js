/**
 * Creates a ref-counted multicaster for an observable, allowing multiple subscribers to share a single subscription.
 * The multicaster can be configured to reset on error, completion, or when the reference count drops to zero.
 *
 * @param {Object} [options={}] - Configuration options for the multicaster.
 * @param {function(): Subject} [options.connector] - Factory function to create a new Subject for multicasting.
 * @param {boolean} [options.resetOnError=true] - Whether to reset the multicaster on error.
 * @param {boolean} [options.resetOnComplete=true] - Whether to reset the multicaster on completion.
 * @param {boolean} [options.resetOnRefCountZero=true] - Whether to reset the multicaster when there are no subscribers.
 * @returns {function(Observable): Observable} - a function that takes a source observable and returns a multicasted observable.
 */
function createRefCountedMulticaster(options = {}) {
  const {
    connector = () => new xk9.Subject(),
    resetOnError = true,
    resetOnComplete = true,
    resetOnRefCountZero = true
  } = options;

  /**
   * The multicasting operator function.
   * @param {Observable} sourceObservable - The source observable to multicast.
   * @returns {Observable} - The multicasted observable.
   */
  return function multicastedOperator(sourceObservable) {
    let mainSubscription = undefined; // Subscription to the source observable
    let subject = undefined; // The current subject used for multicasting
    let resetTimeout = undefined; // Timeout handle for resetting
    let refCount = 0; // Number of active subscribers
    let hasCompleted = false; // Whether the source has completed
    let hasErrored = false; // Whether the source has errored

    // Unsubscribe from the reset timeout if set
    const clearResetTimeout = () => {
      if (resetTimeout !== undefined) {
        resetTimeout.unsubscribe();
        resetTimeout = undefined;
      }
    };

    // Reset all state except for the subject
    const resetState = () => {
      clearResetTimeout();
      mainSubscription = undefined;
      subject = undefined;
      hasCompleted = false;
      hasErrored = false;
    };

    // Fully unsubscribe and reset all state
    const fullUnsubscribe = () => {
      const subscriptionToUnsubscribe = mainSubscription;
      resetState();
      if (subscriptionToUnsubscribe !== undefined) {
        subscriptionToUnsubscribe.unsubscribe();
      }
    };

    // The operator logic for each subscriber
    return fk9.operate(function (source, subscriber) {
      refCount++;
      // If this is the first subscriber after completion/error, clear any reset timeout
      if (!hasErrored && !hasCompleted) {
        clearResetTimeout();
      }

      // Create or reuse the subject for multicasting
      subject = subject !== undefined ? subject : connector();
      const currentSubject = subject;

      // When the subscriber unsubscribes
      subscriber.add(function () {
        refCount--;
        // If no more subscribers and not completed/errored, schedule a reset
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetTimeout = handleConditionalSubscription(fullUnsubscribe, resetOnRefCountZero);
        }
      });

      // Subscribe the current subscriber to the subject
      currentSubject.subscribe(subscriber);

      // If there is no main subscription and at least one subscriber, subscribe to the source
      if (!mainSubscription && refCount > 0) {
        mainSubscription = new lMA.SafeSubscriber({
          next: (value) => currentSubject.next(value),
          error: (err) => {
            hasErrored = true;
            clearResetTimeout();
            resetTimeout = handleConditionalSubscription(resetState, resetOnError, err);
            currentSubject.error(err);
          },
          complete: () => {
            hasCompleted = true;
            clearResetTimeout();
            resetTimeout = handleConditionalSubscription(resetState, resetOnComplete);
            currentSubject.complete();
          }
        });
        // Subscribe to the source observable
        cMA.innerFrom(source).subscribe(mainSubscription);
      }
    })(sourceObservable);
  };
}

module.exports = createRefCountedMulticaster;