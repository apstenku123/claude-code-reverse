/**
 * Applies an operator to an Observable that controls when to emit values and when to complete,
 * based on 'leading' and 'trailing' configuration options. It processes each value using the provided
 * sourceObservable function and manages inner subscriptions accordingly.
 *
 * @param {function(any): Observable} sourceObservable - Function that processes each emitted value and returns an Observable.
 * @param {Object} [config={}] - Configuration object.
 * @param {boolean} [config.leading=true] - If true, emits the value immediately when received.
 * @param {boolean} [config.trailing=false] - If true, emits the last value on completion.
 * @returns {function(Observable, Subscriber): void} Operator function to be used with an Observable.
 */
function operateWithLeadingTrailing(sourceObservable, config) {
  return ky9.operate(function (inputObservable, subscriber) {
    const {
      leading = true,
      trailing = false
    } = config != null ? config : {};

    let hasPendingValue = false; // Indicates if there'createInteractionAccessor a value waiting to be emitted
    let lastValue = null;        // Stores the last received value
    let innerSubscription = null; // Holds the current inner subscription
    let isCompleted = false;     // Indicates if the outer observable has completed

    /**
     * Cleans up the inner subscription and completes if trailing is enabled.
     */
    const cleanupInnerSubscription = () => {
      if (innerSubscription != null) {
        innerSubscription.unsubscribe();
        innerSubscription = null;
      }
      if (trailing) {
        emitPendingValue();
        if (isCompleted) {
          subscriber.complete();
        }
      }
    };

    /**
     * Completes the subscriber if the observable is completed.
     */
    const completeIfDone = () => {
      innerSubscription = null;
      if (isCompleted) {
        subscriber.complete();
      }
    };

    /**
     * Subscribes to the inner observable returned by sourceObservable.
     * @param {any} value - The value to process.
     */
    const subscribeToInner = (value) => {
      innerSubscription = yy9.innerFrom(sourceObservable(value)).subscribe(
        LLA.createOperatorSubscriber(subscriber, cleanupInnerSubscription, completeIfDone)
      );
    };

    /**
     * Emits the pending value if there is one, and subscribes to its inner observable.
     */
    const emitPendingValue = () => {
      if (hasPendingValue) {
        hasPendingValue = false;
        const valueToEmit = lastValue;
        lastValue = null;
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
         * Handles each value emitted by the input observable.
         * @param {any} value - The emitted value.
         */
        function (value) {
          hasPendingValue = true;
          lastValue = value;
          // If there'createInteractionAccessor no active inner subscription, emit immediately if leading is true
          if (!(innerSubscription && !innerSubscription.closed)) {
            if (leading) {
              emitPendingValue();
            } else {
              subscribeToInner(value);
            }
          }
        },
        /**
         * Handles completion of the input observable.
         */
        function () {
          isCompleted = true;
          // If trailing is not enabled or there'createInteractionAccessor no pending value, complete immediately
          if (!(trailing && hasPendingValue && innerSubscription && !innerSubscription.closed)) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = operateWithLeadingTrailing;