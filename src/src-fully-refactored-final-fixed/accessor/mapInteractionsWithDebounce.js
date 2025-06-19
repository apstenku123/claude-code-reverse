/**
 * Applies a mapping function to user interaction entries, mapping each to a route name and storing relevant metadata.
 * Supports debouncing with configurable leading/trailing emission behavior.
 *
 * @param {function} mapInteractionsToRoutes - Function that processes an interaction entry and returns an observable of mapped routes.
 * @param {Object} [config] - Configuration object for debounce behavior.
 * @param {boolean} [config.leading=true] - If true, emit on the leading edge of the debounce period.
 * @param {boolean} [config.trailing=false] - If true, emit on the trailing edge of the debounce period.
 * @returns {function} Operator function to be used with an observable.
 */
function mapInteractionsWithDebounce(mapInteractionsToRoutes, config) {
  return ky9.operate(function (sourceObservable, subscriber) {
    const options = config !== null && config !== undefined ? config : {};
    const leading = options.leading === undefined ? true : options.leading;
    const trailing = options.trailing === undefined ? false : options.trailing;

    let hasPendingValue = false;
    let lastValue = null;
    let innerSubscription = null;
    let isComplete = false;

    /**
     * Handles completion of the inner subscription.
     * If trailing is enabled, emit the last value and complete if the source is done.
     */
    const handleInnerComplete = () => {
      if (innerSubscription !== null && innerSubscription !== undefined) {
        innerSubscription.unsubscribe();
      }
      innerSubscription = null;
      if (trailing) {
        emitPendingValue();
        if (isComplete) {
          subscriber.complete();
        }
      }
    };

    /**
     * Handles completion of the outer observable.
     * Completes the subscriber if the source is done.
     */
    const handleOuterComplete = () => {
      innerSubscription = null;
      if (isComplete) {
        subscriber.complete();
      }
    };

    /**
     * Subscribes to the mapped observable for the given value.
     * @param {*} value - The value to map and subscribe to.
     */
    const subscribeToMapped = (value) => {
      innerSubscription = yy9.innerFrom(mapInteractionsToRoutes(value)).subscribe(
        LLA.createOperatorSubscriber(subscriber, handleInnerComplete, handleOuterComplete)
      );
    };

    /**
     * Emits the pending value if available and subscribes to its mapped observable.
     */
    const emitPendingValue = () => {
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = lastValue;
        lastValue = null;
        subscriber.next(valueToEmit);
        if (!isComplete) {
          subscribeToMapped(valueToEmit);
        }
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      LLA.createOperatorSubscriber(
        subscriber,
        /**
         * Handles each value from the source observable.
         * Stores the value and emits/subscribes based on leading/trailing config.
         * @param {*} value
         */
        function (value) {
          hasPendingValue = true;
          lastValue = value;
          // If no active inner subscription, emit immediately if leading, otherwise wait for trailing
          if (!(innerSubscription && !innerSubscription.closed)) {
            if (leading) {
              emitPendingValue();
            } else {
              subscribeToMapped(value);
            }
          }
        },
        /**
         * Handles completion of the source observable.
         * If trailing is enabled and there is a pending value, wait for inner to complete before completing subscriber.
         */
        function () {
          isComplete = true;
          if (!(trailing && hasPendingValue && innerSubscription && !innerSubscription.closed)) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = mapInteractionsWithDebounce;