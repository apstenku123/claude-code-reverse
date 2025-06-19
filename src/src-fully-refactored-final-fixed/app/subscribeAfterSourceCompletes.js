/**
 * Subscribes to the main observable only after the provided source observable completes.
 *
 * @function subscribeAfterSourceCompletes
 * @param {Observable<any>} sourceObservable - The observable whose completion triggers subscription to the main observable.
 * @returns {function(Observable<any>): Observable<any>} An operator function that delays emission until the sourceObservable completes.
 */
function subscribeAfterSourceCompletes(sourceObservable) {
  return tk9.operate(function (mainObservable, subscriber) {
    let sourceCompleted = false;

    // Create a subscriber for the sourceObservable
    const sourceSubscriber = ALA.createOperatorSubscriber(
      subscriber,
      () => {
        // Unsubscribe from the source once isBlobOrFileLikeObject completes and mark as completed
        if (sourceSubscriber) {
          sourceSubscriber.unsubscribe();
        }
        sourceCompleted = true;
      },
      Ay9.noop // No error handler
    );

    // Subscribe to the sourceObservable
    ek9.innerFrom(sourceObservable).subscribe(sourceSubscriber);

    // Subscribe to the main observable, but only emit values after the source completes
    mainObservable.subscribe(
      ALA.createOperatorSubscriber(
        subscriber,
        (value) => {
          if (sourceCompleted) {
            subscriber.next(value);
          }
        }
      )
    );
  });
}

module.exports = subscribeAfterSourceCompletes;