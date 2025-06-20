/**
 * Emits each value from the source Observable paired with its previous value as an array.
 * The first emission is skipped since there is no previous value.
 *
 * @returns {function} An operator function that can be used with Observable.pipe().
 */
function pairWithPreviousOperator() {
  return Sj9.operate(function (sourceObservable, subscriber) {
    let previousValue;
    let hasPrevious = false;
    // Subscribe to the source observable
    sourceObservable.subscribe(
      _j9.createOperatorSubscriber(
        subscriber,
        function (currentValue) {
          const lastValue = previousValue;
          previousValue = currentValue;
          // Only emit after the first value (when there is a previous value)
          if (hasPrevious) {
            subscriber.next([lastValue, currentValue]);
          }
          hasPrevious = true;
        }
      )
    );
  });
}

module.exports = pairWithPreviousOperator;