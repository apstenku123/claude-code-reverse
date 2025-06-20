/**
 * Subscribes to the provided source observable and, upon its completion, 
 * forwards emissions from the input observable to the downstream subscriber.
 *
 * @param {Observable<any>} sourceObservable - The observable whose completion triggers forwarding.
 * @returns {function(Observable<any>): Observable<any>} Operator function for use in observable pipelines.
 */
function subscribeWhenSourceCompletes(sourceObservable) {
  return tk9.operate(function (inputObservable, downstreamSubscriber) {
    let sourceCompleted = false;

    // Create a subscriber for the source observable
    const sourceSubscriber = ALA.createOperatorSubscriber(
      downstreamSubscriber,
      () => {
        // On completion, unsubscribe and mark as completed
        if (sourceSubscriber) {
          sourceSubscriber.unsubscribe();
        }
        sourceCompleted = true;
      },
      Ay9.noop // No-op for error handler
    );

    // Subscribe to the source observable
    ek9.innerFrom(sourceObservable).subscribe(sourceSubscriber);

    // Subscribe to the input observable, but only forward values if the source has completed
    inputObservable.subscribe(
      ALA.createOperatorSubscriber(
        downstreamSubscriber,
        (value) => {
          if (sourceCompleted) {
            downstreamSubscriber.next(value);
          }
        }
      )
    );
  });
}

module.exports = subscribeWhenSourceCompletes;