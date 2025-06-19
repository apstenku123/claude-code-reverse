/**
 * Creates an RxJS operator that multicasts the source Observable using a connector (e.g., Subject),
 * and manages the subscription lifecycle based on reference counting and configurable reset behaviors.
 *
 * @param {Object} [options={}] - Configuration options for the operator.
 * @param {Function} [options.connector] - Factory function to create a new Subject or similar connector.
 * @param {boolean} [options.resetOnError=true] - Whether to reset the connector on error.
 * @param {boolean} [options.resetOnComplete=true] - Whether to reset the connector on completion.
 * @param {boolean} [options.resetOnRefCountZero=true] - Whether to reset the connector when refCount drops to zero.
 * @returns {Function} Operator function to be used with an RxJS Observable.
 */
function createRefCountedMulticastOperator(options = {}) {
  const {
    connector = () => new xk9.Subject(),
    resetOnError = true,
    resetOnComplete = true,
    resetOnRefCountZero = true
  } = options;

  /**
   * The operator function to be applied to the source Observable.
   * @param {Observable} sourceObservable - The source Observable to multicast.
   * @returns {Observable} The multicasted Observable with refCount and reset logic.
   */
  return function multicastOperator(sourceObservable) {
    let mainSubscription; // Subscription to the source observable
    let connectorInstance; // The current connector (e.g., Subject)
    let resetTimeout; // Timeout handler for delayed resets
    let refCount = 0; // Number of active subscribers
    let hasCompleted = false; // Whether the source has completed
    let hasErrored = false; // Whether the source has errored

    /**
     * Unsubscribes from the reset timeout if set.
     */
    const clearResetTimeout = () => {
      if (resetTimeout !== undefined) {
        resetTimeout.unsubscribe();
        resetTimeout = undefined;
      }
    };

    /**
     * Resets the connector and related state.
     */
    const resetConnector = () => {
      clearResetTimeout();
      mainSubscription = undefined;
      connectorInstance = undefined;
      hasCompleted = false;
      hasErrored = false;
    };

    /**
     * Unsubscribes from the source and resets the connector.
     */
    const unsubscribeAndReset = () => {
      const subscriptionToUnsubscribe = mainSubscription;
      resetConnector();
      if (subscriptionToUnsubscribe !== undefined) {
        subscriptionToUnsubscribe.unsubscribe();
      }
    };

    // The actual operator logic, using fk9.operate (assumed to be RxJS'createInteractionAccessor operate helper)
    return fk9.operate(function (source, subscriber) {
      refCount++;
      // If this is the first subscriber after a reset, clear any pending reset
      if (!hasErrored && !hasCompleted) {
        clearResetTimeout();
      }

      // Create or reuse the connector (Subject)
      connectorInstance = connectorInstance ?? connector();
      const currentConnector = connectorInstance;

      // When the subscriber unsubscribes, handle refCount and possible reset
      subscriber.add(function () {
        refCount--;
        if (refCount === 0 && !hasErrored && !hasCompleted) {
          // Schedule a reset if configured
          resetTimeout = handleConditionalSubscription(unsubscribeAndReset, resetOnRefCountZero);
        }
      });

      // Subscribe the downstream subscriber to the connector
      currentConnector.subscribe(subscriber);

      // If there is no active subscription to the source, start one
      if (!mainSubscription && refCount > 0) {
        mainSubscription = new lMA.SafeSubscriber({
          next: function (value) {
            currentConnector.next(value);
          },
          error: function (err) {
            hasErrored = true;
            clearResetTimeout();
            resetTimeout = handleConditionalSubscription(resetConnector, resetOnError, err);
            currentConnector.error(err);
          },
          complete: function () {
            hasCompleted = true;
            clearResetTimeout();
            resetTimeout = handleConditionalSubscription(resetConnector, resetOnComplete);
            currentConnector.complete();
          }
        });
        // Subscribe to the source observable
        cMA.innerFrom(source).subscribe(mainSubscription);
      }
    })(sourceObservable);
  };
}

module.exports = createRefCountedMulticastOperator;