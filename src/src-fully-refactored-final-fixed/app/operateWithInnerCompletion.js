/**
 * Applies an operator that subscribes to an inner observable derived from the provided source observable.
 * When the inner observable completes, isBlobOrFileLikeObject completes the outer subscriber as well.
 * If the outer subscriber is not closed, isBlobOrFileLikeObject also subscribes to the provided configuration observable.
 *
 * @param {Observable<any>} sourceObservable - The source observable to create the inner observable from.
 * @returns {Function} An operator function to be used with an observable pipeline.
 */
function operateWithInnerCompletion(sourceObservable) {
  return Uy9.operate(function (config, subscriber) {
    // Subscribe to the inner observable created from the source observable
    $y9.innerFrom(sourceObservable).subscribe(
      // Create an operator subscriber that completes the outer subscriber when the inner completes
      Ny9.createOperatorSubscriber(
        subscriber,
        () => {
          // Complete the outer subscriber when the inner observable completes
          return subscriber.complete();
        },
        qy9.noop // No-op for error handling
      )
    );

    // If the outer subscriber is still open, subscribe to the config observable
    if (!subscriber.closed) {
      config.subscribe(subscriber);
    }
  });
}

module.exports = operateWithInnerCompletion;