/**
 * Applies a custom operator to an observable, controlling how and when the source observable is subscribed to and how values are emitted.
 *
 * @param {function(any): Observable} processInteractionEntries - Function that processes each emitted value and returns an observable.
 * @param {Object} [config] - Optional configuration object.
 * @param {boolean} [config.leading=true] - If true, emit the first value immediately on subscription.
 * @param {boolean} [config.trailing=false] - If true, emit the last value on completion.
 * @returns {function(Observable): void} Operator function to be used with an observable.
 */
function getLLA(processInteractionEntries, config) {
  return ky9.operate(function (sourceObservable, subscriber) {
    // Extract configuration with defaults
    const {
      leading: emitLeading = true,
      trailing: emitTrailing = false
    } = config ?? {};

    let hasPendingValue = false; // Indicates if there'createInteractionAccessor a value waiting to be emitted
    let pendingValue = null;     // Stores the most recent value
    let innerSubscription = null; // Subscription to the inner observable
    let isComplete = false;      // Indicates if the source observable has completed

    /**
     * Handles completion of the inner observable.
     * If trailing is enabled, emit the last value and complete if source is done.
     */
    const handleInnerComplete = () => {
      if (innerSubscription) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
      }
      if (emitTrailing) {
        emitPendingValue();
        if (isComplete) {
          subscriber.complete();
        }
      }
    };

    /**
     * Handles completion of the source observable.
     * Completes the subscriber if trailing is not enabled or there is no pending value.
     */
    const handleSourceComplete = () => {
      innerSubscription = null;
      if (isComplete) {
        subscriber.complete();
      }
    };

    /**
     * Subscribes to the inner observable returned by processInteractionEntries.
     * @param {*} value - The value to process.
     */
    const subscribeToInner = (value) => {
      innerSubscription = yy9.innerFrom(processInteractionEntries(value)).subscribe(
        LLA.createOperatorSubscriber(subscriber, handleInnerComplete, handleSourceComplete)
      );
    };

    /**
     * Emits the pending value if there is one, and subscribes to the inner observable.
     */
    const emitPendingValue = () => {
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = pendingValue;
        pendingValue = null;
        subscriber.next(valueToEmit);
        if (!isComplete) {
          subscribeToInner(valueToEmit);
        }
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      LLA.createOperatorSubscriber(
        subscriber,
        /**
         * Handles each value emitted by the source observable.
         * Stores the value and emits/subscribes based on configuration.
         * @param {*} value
         */
        function (value) {
          hasPendingValue = true;
          pendingValue = value;
          // If no active inner subscription, emit immediately if leading is enabled, otherwise subscribe to inner
          if (!(innerSubscription && !innerSubscription.closed)) {
            if (emitLeading) {
              emitPendingValue();
            } else {
              subscribeToInner(value);
            }
          }
        },
        /**
         * Handles completion of the source observable.
         * If trailing is enabled and there is a pending value, wait for inner to complete before completing subscriber.
         */
        function () {
          isComplete = true;
          if (!(emitTrailing && hasPendingValue && innerSubscription && !innerSubscription.closed)) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = getLLA;