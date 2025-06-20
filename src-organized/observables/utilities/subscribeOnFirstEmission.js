/**
 * Subscribes to a source observable and, upon its first emission, unsubscribes from isBlobOrFileLikeObject and starts forwarding emissions from the outer observable.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to for the initial emission.
 * @returns {Function} Operator function to be used with an observable.
 */
function subscribeOnFirstEmission(sourceObservable) {
  return tk9.operate(function (outerObservable, subscriber) {
    let hasSourceEmitted = false;
    // Create a subscriber for the source observable
    const sourceSubscriber = ALA.createOperatorSubscriber(
      subscriber,
      function handleSourceEmission() {
        // Unsubscribe from source observable after first emission
        if (sourceSubscriber) {
          sourceSubscriber.unsubscribe();
        }
        hasSourceEmitted = true;
      },
      Ay9.noop // No-op for error/completion handlers
    );

    // Subscribe to the source observable
    ek9.innerFrom(sourceObservable).subscribe(sourceSubscriber);

    // Subscribe to the outer observable, but only forward values after the source has emitted
    outerObservable.subscribe(
      ALA.createOperatorSubscriber(
        subscriber,
        function handleOuterEmission(value) {
          if (hasSourceEmitted) {
            subscriber.next(value);
          }
        }
      )
    );
  });
}

module.exports = subscribeOnFirstEmission;