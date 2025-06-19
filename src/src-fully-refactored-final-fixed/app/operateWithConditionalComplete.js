/**
 * Applies a custom operator to an observable that conditionally completes or errors based on emission.
 *
 * @param {Function} [getErrorFactory=defaultErrorFactory] - a function that returns an error to emit if the source completes without emitting any values.
 * @returns {Function} An RxJS operator function that can be piped into an observable.
 */
function operateWithConditionalComplete(getErrorFactory = defaultErrorFactory) {
  return rxjsOperator.operate((sourceObservable, subscriber) => {
    let hasEmitted = false;
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      operatorSubscriberFactory.createOperatorSubscriber(
        subscriber,
        (value) => {
          hasEmitted = true;
          subscriber.next(value);
        },
        () => {
          // If at least one value was emitted, complete; otherwise, error
          if (hasEmitted) {
            subscriber.complete();
          } else {
            subscriber.error(getErrorFactory());
          }
        }
      )
    );
  });
}

module.exports = operateWithConditionalComplete;