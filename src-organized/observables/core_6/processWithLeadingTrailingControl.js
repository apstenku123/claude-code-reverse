/**
 * Applies a custom operator to an Observable, controlling emission timing with leading and trailing options.
 *
 * @template BugReportForm, isWildcardOrX
 * @param {function(BugReportForm): Observable<isWildcardOrX>} sourceObservable - Function that processes each emitted value and returns an Observable.
 * @param {Object} [config] - Configuration object for emission control.
 * @param {boolean} [config.leading=true] - If true, emit the first value in a burst immediately.
 * @param {boolean} [config.trailing=false] - If true, emit the last value in a burst after the source completes.
 * @returns {function(Observable<BugReportForm>): Observable<isWildcardOrX>} Operator function to be used with Observable.pipe().
 */
function processWithLeadingTrailingControl(sourceObservable, config) {
  return ky9.operate(function (inputObservable, subscriber) {
    const options = config != null ? config : {};
    const leading = options.leading !== undefined ? options.leading : true;
    const trailing = options.trailing !== undefined ? options.trailing : false;

    let hasPendingValue = false; // Indicates if there'createInteractionAccessor a value waiting to be emitted
    let lastValue = null;        // Stores the last received value
    let innerSubscription = null; // Subscription to the inner Observable
    let isComplete = false;      // Indicates if the source Observable has completed

    /**
     * Handles completion of the inner Observable when trailing is enabled.
     * Emits the last value if needed and completes the subscriber.
     */
    const handleInnerComplete = () => {
      if (innerSubscription) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
      }
      if (trailing) {
        emitPendingValue();
        if (isComplete) {
          subscriber.complete();
        }
      }
    };

    /**
     * Handles completion of the inner Observable when trailing is not enabled.
     * Completes the subscriber if the source is complete.
     */
    const handleInnerFinalize = () => {
      innerSubscription = null;
      if (isComplete) {
        subscriber.complete();
      }
    };

    /**
     * Subscribes to the inner Observable created from the latest value.
     * @param {BugReportForm} value - The value to process.
     */
    const subscribeToInner = (value) => {
      innerSubscription = yy9.innerFrom(sourceObservable(value)).subscribe(
        LLA.createOperatorSubscriber(subscriber, handleInnerComplete, handleInnerFinalize)
      );
    };

    /**
     * Emits the pending value if there is one, and subscribes to the inner Observable.
     */
    const emitPendingValue = () => {
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = lastValue;
        lastValue = null;
        subscriber.next(valueToEmit);
        if (!isComplete) {
          subscribeToInner(valueToEmit);
        }
      }
    };

    // Subscribe to the input Observable
    inputObservable.subscribe(
      LLA.createOperatorSubscriber(
        subscriber,
        /**
         * Handles each value emitted by the source Observable.
         * @param {BugReportForm} value - The emitted value.
         */
        (value) => {
          hasPendingValue = true;
          lastValue = value;
          // If there'createInteractionAccessor no active inner subscription, emit immediately if leading is true, otherwise wait
          if (!(innerSubscription && !innerSubscription.closed)) {
            if (leading) {
              emitPendingValue();
            } else {
              subscribeToInner(value);
            }
          }
        },
        /**
         * Handles completion of the source Observable.
         */
        () => {
          isComplete = true;
          // If trailing is enabled and there'createInteractionAccessor a pending value, and inner is still active, wait for inner to complete
          if (!(trailing && hasPendingValue && innerSubscription && !innerSubscription.closed)) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = processWithLeadingTrailingControl;