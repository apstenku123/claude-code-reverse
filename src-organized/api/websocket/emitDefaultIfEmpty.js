/**
 * Emits the defaultValue if the source observable completes without emitting any values.
 *
 * @function emitDefaultIfEmpty
 * @param {any} defaultValue - The value to emit if the source observable is empty.
 * @returns {function} Operator function that emits defaultValue if the source observable is empty.
 */
function emitDefaultIfEmpty(defaultValue) {
  return ZS9.operate(function (sourceObservable, subscriber) {
    let hasEmitted = false;
    // Subscribe to the source observable
    sourceObservable.subscribe(
      DS9.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Mark that at least one value has been emitted
          hasEmitted = true;
          subscriber.next(value);
        },
        function () {
          // If no values were emitted, emit the default value
          if (!hasEmitted) {
            subscriber.next(defaultValue);
          }
          subscriber.complete();
        }
      )
    );
  });
}

module.exports = emitDefaultIfEmpty;