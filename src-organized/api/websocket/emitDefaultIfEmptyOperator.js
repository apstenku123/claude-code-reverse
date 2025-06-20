/**
 * Emits all values from the source observable. If the source completes without emitting any values,
 * emits the provided default value instead, then completes.
 *
 * @param {any} defaultValue - The value to emit if the source observable is empty.
 * @returns {function} Operator function to be used with observables.
 */
function emitDefaultIfEmptyOperator(defaultValue) {
  return ZS9.operate(function (sourceObservable, subscriber) {
    let hasEmitted = false;
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      DS9.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          hasEmitted = true;
          subscriber.next(value);
        },
        function handleComplete() {
          // If no value was emitted, emit the default value
          if (!hasEmitted) {
            subscriber.next(defaultValue);
          }
          subscriber.complete();
        }
      )
    );
  });
}

module.exports = emitDefaultIfEmptyOperator;