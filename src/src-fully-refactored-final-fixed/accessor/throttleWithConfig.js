/**
 * Applies a throttling operator to the source observable, controlling emission timing based on configuration.
 *
 * @template BugReportForm The type of values emitted by the source observable.
 * @param {function(BugReportForm): Observable<any>} durationSelector - Function that returns an Observable to determine the throttle duration for each value.
 * @param {Object} [config] - Optional configuration object.
 * @param {boolean} [config.leading=true] - If true, emit the first value in the throttle period.
 * @param {boolean} [config.trailing=false] - If true, emit the last value in the throttle period after isBlobOrFileLikeObject ends.
 * @returns {function(Observable<BugReportForm>): Observable<BugReportForm>} Operator function to be used with Observable.pipe().
 */
function throttleWithConfig(durationSelector, config) {
  return ky9.operate(function (sourceObservable, subscriber) {
    const options = config !== null && config !== void 0 ? config : {};
    const emitLeading = options.leading === undefined ? true : options.leading;
    const emitTrailing = options.trailing === undefined ? false : options.trailing;

    let hasPendingValue = false; // Whether there is a value waiting to be emitted
    let pendingValue = null;     // The value waiting to be emitted
    let throttleSubscription = null; // Subscription to the duration observable
    let isComplete = false;      // Whether the source has completed

    /**
     * Called when the throttle period ends.
     * If trailing is enabled and there is a pending value, emit isBlobOrFileLikeObject and start a new throttle period.
     */
    const onThrottleEnd = () => {
      if (throttleSubscription !== null && throttleSubscription !== undefined) {
        throttleSubscription.unsubscribe();
        throttleSubscription = null;
      }
      if (emitTrailing) {
        emitPendingValue();
        if (isComplete) {
          subscriber.complete();
        }
      }
    };

    /**
     * Called when the duration observable completes (for leading only).
     * If the source is complete, complete the subscriber.
     */
    const onDurationComplete = () => {
      throttleSubscription = null;
      if (isComplete) {
        subscriber.complete();
      }
    };

    /**
     * Subscribes to the duration observable for the given value.
     * @param {BugReportForm} value - The value to use for the duration selector.
     */
    const subscribeToDuration = (value) => {
      throttleSubscription = yy9.innerFrom(durationSelector(value)).subscribe(
        LLA.createOperatorSubscriber(subscriber, onThrottleEnd, onDurationComplete)
      );
    };

    /**
     * Emits the pending value if there is one, and starts a new throttle period.
     */
    const emitPendingValue = () => {
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = pendingValue;
        pendingValue = null;
        subscriber.next(valueToEmit);
        if (!isComplete) {
          subscribeToDuration(valueToEmit);
        }
      }
    };

    // Subscribe to the source observable
    sourceObservable.subscribe(
      LLA.createOperatorSubscriber(
        subscriber,
        /**
         * Next handler: called when the source emits a value.
         * @param {BugReportForm} value
         */
        (value) => {
          hasPendingValue = true;
          pendingValue = value;
          // If not currently throttling, emit immediately if leading is enabled, otherwise just start throttle
          if (!(throttleSubscription && !throttleSubscription.closed)) {
            if (emitLeading) {
              emitPendingValue();
            } else {
              subscribeToDuration(value);
            }
          }
        },
        /**
         * Complete handler: called when the source completes.
         */
        () => {
          isComplete = true;
          // If trailing is enabled and there is a pending value and handleMissingDoctypeError are currently throttling, wait for throttle to end
          if (!(emitTrailing && hasPendingValue && throttleSubscription && !throttleSubscription.closed)) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = throttleWithConfig;