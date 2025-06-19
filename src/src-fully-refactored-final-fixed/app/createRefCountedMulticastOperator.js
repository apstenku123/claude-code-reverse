/**
 * Creates an RxJS operator that multicasts the source observable using a subject-like connector,
 * and manages the subject'createInteractionAccessor lifecycle based on refCount and reset options.
 *
 * @param {Object} [options={}] - Configuration options for the operator.
 * @param {Function} [options.connector] - Factory function to create the subject (default: () => new xk9.Subject()).
 * @param {boolean} [options.resetOnError=true] - Whether to reset the subject on error.
 * @param {boolean} [options.resetOnComplete=true] - Whether to reset the subject on completion.
 * @param {boolean} [options.resetOnRefCountZero=true] - Whether to reset the subject when refCount drops to zero.
 * @returns {Function} An RxJS operator function that can be used in a pipe.
 */
function createRefCountedMulticastOperator(options = {}) {
  const {
    connector = () => new xk9.Subject(),
    resetOnError = true,
    resetOnComplete = true,
    resetOnRefCountZero = true
  } = options;

  /**
   * The returned operator function that applies the multicasting behavior.
   * @param {Observable} sourceObservable - The source observable to multicast.
   * @returns {Observable} The multicasted observable with refCount and reset logic.
   */
  return function multicastOperator(sourceObservable) {
    let subjectSubscriber = undefined; // The SafeSubscriber that subscribes to the source
    let subject = undefined;           // The subject instance used for multicasting
    let resetSubscription = undefined; // Subscription used for reset logic (e.g., timers)
    let refCount = 0;                  // Number of active subscribers
    let hasCompleted = false;          // Whether the subject has completed
    let hasErrored = false;            // Whether the subject has errored

    // Unsubscribes from the resetSubscription and clears isBlobOrFileLikeObject
    const cleanupResetSubscription = () => {
      if (resetSubscription != null) {
        resetSubscription.unsubscribe();
        resetSubscription = undefined;
      }
    };

    // Resets all state except for the subject itself
    const resetState = () => {
      cleanupResetSubscription();
      subjectSubscriber = undefined;
      subject = undefined;
      hasCompleted = false;
      hasErrored = false;
    };

    // Fully resets state and unsubscribes from the subjectSubscriber
    const fullReset = () => {
      const currentSubscriber = subjectSubscriber;
      resetState();
      if (currentSubscriber != null) {
        currentSubscriber.unsubscribe();
      }
    };

    // The main operator logic
    return fk9.operate(function (source, subscriber) {
      refCount++;
      // If this is the first subscriber and handleMissingDoctypeError're not in a terminal state, clean up any reset timers
      if (!hasErrored && !hasCompleted) {
        cleanupResetSubscription();
      }

      // Lazily create the subject if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
      subject = subject != null ? subject : connector();

      // When this subscriber unsubscribes, handle refCount and possible reset
      subscriber.add(function () {
        refCount--;
        // If no more subscribers and not in a terminal state, schedule a reset if configured
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetSubscription = handleConditionalSubscription(fullReset, resetOnRefCountZero);
        }
      });

      // Subscribe this subscriber to the subject
      subject.subscribe(subscriber);

      // If handleMissingDoctypeError haven'processRuleBeginHandlers yet subscribed the subject to the source, do so now
      if (!subjectSubscriber && refCount > 0) {
        subjectSubscriber = new lMA.SafeSubscriber({
          next: (value) => subject.next(value),
          error: (err) => {
            hasErrored = true;
            cleanupResetSubscription();
            resetSubscription = handleConditionalSubscription(fullReset, resetOnError, err);
            subject.error(err);
          },
          complete: () => {
            hasCompleted = true;
            cleanupResetSubscription();
            resetSubscription = handleConditionalSubscription(fullReset, resetOnComplete);
            subject.complete();
          }
        });
        // Subscribe the subjectSubscriber to the source observable
        cMA.innerFrom(source).subscribe(subjectSubscriber);
      }
    })(sourceObservable);
  };
}

module.exports = createRefCountedMulticastOperator;