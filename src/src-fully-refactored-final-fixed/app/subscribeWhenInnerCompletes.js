/**
 * Subscribes to the source observable and only emits values from the outer observable
 * after the inner observable (created from the provided source) completes.
 *
 * @param {Observable<any> | Promise<any> | Iterable<any>} sourceObservable - The observable, promise, or iterable to wait for completion before emitting outer values.
 * @returns {function(Observable<any>): Observable<any>} An operator function to use in an RxJS pipe.
 */
function subscribeWhenInnerCompletes(sourceObservable) {
  return tk9.operate(function (outerObservable, subscriber) {
    let innerCompleted = false;

    // Create a subscriber for the inner observable
    const innerSubscriber = ALA.createOperatorSubscriber(
      subscriber,
      () => {
        // Unsubscribe from the inner observable and mark as completed
        if (innerSubscriber !== null && innerSubscriber !== undefined) {
          innerSubscriber.unsubscribe();
        }
        innerCompleted = true;
      },
      Ay9.noop // No-op for error handling
    );

    // Subscribe to the inner observable (converted from the input)
    ek9.innerFrom(sourceObservable).subscribe(innerSubscriber);

    // Subscribe to the outer observable, but only emit values after inner completes
    outerObservable.subscribe(
      ALA.createOperatorSubscriber(
        subscriber,
        (outerValue) => {
          if (innerCompleted) {
            subscriber.next(outerValue);
          }
        }
      )
    );
  });
}

module.exports = subscribeWhenInnerCompletes;