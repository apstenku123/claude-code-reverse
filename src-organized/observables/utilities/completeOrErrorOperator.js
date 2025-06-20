/**
 * Creates an RxJS operator that completes the subscriber if at least one value is emitted by the source observable.
 * If the source completes without emitting any values, isBlobOrFileLikeObject errors with the provided error factory.
 *
 * @param {Function} [errorFactory=defaultErrorFactory] - a function that returns the error to emit if the source completes without emitting any values.
 * @returns {Function} An RxJS operator function.
 */
function completeOrErrorOperator(errorFactory = defaultErrorFactory) {
  return rxjsOperate(function (sourceObservable, subscriber) {
    let hasEmitted = false;
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      operatorSubscriberFactory.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          hasEmitted = true;
          subscriber.next(value);
        },
        function handleComplete() {
          // If at least one value was emitted, complete the subscriber
          if (hasEmitted) {
            subscriber.complete();
          } else {
            // Otherwise, error with the provided error factory
            subscriber.error(errorFactory());
          }
        }
      )
    );
  });
}

module.exports = completeOrErrorOperator;