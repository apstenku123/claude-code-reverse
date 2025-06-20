/**
 * Applies a custom operator to an observable that manages leading and trailing emissions,
 * subscribing to a mapped inner observable for each value, with configurable behavior.
 *
 * @param {function} mapInteractionsToRouteNames - Function that maps an emitted value to an inner observable.
 * @param {Object} [config] - Configuration object for operator behavior.
 * @param {boolean} [config.leading=true] - Whether to emit the value on the leading edge.
 * @param {boolean} [config.trailing=false] - Whether to emit the value on the trailing edge.
 * @returns {function} Operator function to be used with an observable.
 */
function getLatestLeadingTrailingAccessor(mapInteractionsToRouteNames, config) {
  return ky9.operate(function (sourceObservable, subscriber) {
    const {
      leading: emitOnLeading = true,
      trailing: emitOnTrailing = false
    } = config ?? {};

    let hasPendingValue = false;           // Indicates if there is a value waiting to be emitted
    let pendingValue = null;               // Stores the latest value to be emitted
    let innerSubscription = null;          // Subscription to the inner observable
    let isComplete = false;                // Indicates if the source observable has completed

    /**
     * Handles completion of the inner subscription.
     * If trailing is enabled, emit the pending value and complete if source is done.
     */
    const handleInnerComplete = () => {
      if (innerSubscription) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
      }
      if (emitOnTrailing) {
        emitPendingValue();
        if (isComplete) {
          subscriber.complete();
        }
      }
    };

    /**
     * Handles final completion after inner observable completes.
     */
    const handleFinalComplete = () => {
      innerSubscription = null;
      if (isComplete) {
        subscriber.complete();
      }
    };

    /**
     * Subscribes to the inner observable created from the mapped value.
     * @param {*} value - The value to map and subscribe to.
     */
    const subscribeToInner = (value) => {
      innerSubscription = yy9.innerFrom(mapInteractionsToRouteNames(value)).subscribe(
        LLA.createOperatorSubscriber(subscriber, handleInnerComplete, handleFinalComplete)
      );
    };

    /**
     * Emits the pending value if available, and subscribes to its inner observable if not complete.
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
         * @param {*} value - The emitted value.
         */
        (value) => {
          hasPendingValue = true;
          pendingValue = value;
          // If there is no active inner subscription, emit immediately if leading is enabled
          if (!(innerSubscription && !innerSubscription.closed)) {
            if (emitOnLeading) {
              emitPendingValue();
            } else {
              subscribeToInner(value);
            }
          }
        },
        /**
         * Handles completion of the source observable.
         */
        () => {
          isComplete = true;
          // If trailing is not enabled or there is no pending value, complete immediately
          if (!(emitOnTrailing && hasPendingValue && innerSubscription && !innerSubscription.closed)) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = getLatestLeadingTrailingAccessor;
