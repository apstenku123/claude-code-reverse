/**
 * Applies an operator to an observable that completes on the first emission, or errors if no emission occurs.
 *
 * @function completeOrErrorOnFirstEmission
 * @param {Function} [errorFactory=defaultErrorFactory] - a function that returns the error to emit if the source completes without emitting any values.
 * @returns {Function} An operator function to be used with observables.
 */
function completeOrErrorOnFirstEmission(errorFactory = defaultErrorFactory) {
  return observableLibrary.operate((sourceObservable, subscriber) => {
    let hasEmitted = false;
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      operatorHelpers.createOperatorSubscriber(
        subscriber,
        (value) => {
          // On first emission, set flag and forward the value
          hasEmitted = true;
          subscriber.next(value);
        },
        () => {
          // On completion, check if any value was emitted
          if (hasEmitted) {
            subscriber.complete();
          } else {
            // If not, emit an error using the provided error factory
            subscriber.error(errorFactory());
          }
        }
      )
    );
  });
}

module.exports = completeOrErrorOnFirstEmission;