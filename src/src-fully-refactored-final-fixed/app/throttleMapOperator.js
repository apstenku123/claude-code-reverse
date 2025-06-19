/**
 * Applies a throttle mapping operator to an observable sequence.
 *
 * This operator maps each emitted value from the source observable using the provided mapping function (sourceObservable),
 * and controls the emission timing based on the provided configuration (leading/trailing).
 *
 * @param {Function} sourceObservable - Function that maps each value to an inner observable (e.g., mapInteractionEntriesToRouteNames).
 * @param {Object} [config] - Configuration object to control leading/trailing emission behavior.
 * @param {boolean} [config.leading=true] - If true, emit the first value in the throttle period.
 * @param {boolean} [config.trailing=false] - If true, emit the last value in the throttle period after the period ends.
 * @returns {Function} Operator function to be used with an observable.
 */
function throttleMapOperator(sourceObservable, config) {
  return ky9.operate(function (inputObservable, subscriber) {
    // Extract configuration with defaults
    const {
      leading = true,
      trailing = false
    } = config !== null && config !== undefined ? config : {};

    // State variables
    let hasPendingValue = false; // Whether there'createInteractionAccessor a value waiting to be emitted
    let pendingValue = null;     // The value waiting to be emitted
    let innerSubscription = null; // Subscription to the inner observable
    let isCompleted = false;     // Whether the source observable has completed

    /**
     * Cleanup function for the inner subscription.
     * If trailing is enabled, emit the pending value and complete if source is done.
     */
    const cleanupInnerSubscription = () => {
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;
      if (trailing) {
        emitPendingValue();
        if (isCompleted) {
          subscriber.complete();
        }
      }
    };

    /**
     * Called when the inner observable completes.
     * Completes the subscriber if the source is done.
     */
    const onInnerComplete = () => {
      innerSubscription = null;
      if (isCompleted) {
        subscriber.complete();
      }
    };

    /**
     * Subscribes to the inner observable created by mapping the value.
     * @param {*} value - The value to map and subscribe to.
     */
    const subscribeToInner = (value) => {
      innerSubscription = yy9.innerFrom(sourceObservable(value)).subscribe(
        LLA.createOperatorSubscriber(subscriber, cleanupInnerSubscription, onInnerComplete)
      );
    };

    /**
     * Emits the pending value if there is one, and subscribes to its inner observable.
     * Used for trailing emission.
     */
    const emitPendingValue = () => {
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = pendingValue;
        pendingValue = null;
        subscriber.next(valueToEmit);
        if (!isCompleted) {
          subscribeToInner(valueToEmit);
        }
      }
    };

    // Subscribe to the input observable
    inputObservable.subscribe(
      LLA.createOperatorSubscriber(
        subscriber,
        /**
         * Next handler: called when the source emits a value.
         * Stores the value as pending, and emits/subscribes based on leading/trailing config.
         */
        (value) => {
          hasPendingValue = true;
          pendingValue = value;
          // If not currently throttling, emit immediately if leading is enabled, otherwise wait for trailing
          if (!(innerSubscription && !innerSubscription.closed)) {
            if (leading) {
              emitPendingValue();
            } else {
              subscribeToInner(value);
            }
          }
        },
        /**
         * Complete handler: called when the source completes.
         * If trailing is enabled and there is a pending value, wait for inner to finish before completing.
         * Otherwise, complete immediately.
         */
        () => {
          isCompleted = true;
          if (!(trailing && hasPendingValue && innerSubscription && !innerSubscription.closed)) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = throttleMapOperator;