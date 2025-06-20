/**
 * Creates an RxJS operator that emits `false` when the source completes without emitting,
 * and emits `true` when the source emits at least once before completing.
 *
 * @returns {function} An RxJS operator function to be used with Observable.pipe()
 */
function createBooleanCompletionOperator() {
  return v_9.operate(function (sourceObservable, subscriber) {
    // Use a flag to track if the source has emitted any value
    let hasEmitted = false;

    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      b_9.createOperatorSubscriber(
        subscriber,
        function onNext() {
          // On first emission, set the flag and complete with true
          hasEmitted = true;
          subscriber.next(true);
          subscriber.complete();
        },
        function onComplete() {
          // If no value was emitted, emit false and complete
          if (!hasEmitted) {
            subscriber.next(false);
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = createBooleanCompletionOperator;