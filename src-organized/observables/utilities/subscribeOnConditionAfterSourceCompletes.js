/**
 * Subscribes to the source observable, and only forwards emissions from the input observable
 * after the source observable completes. This is useful for deferring emissions until a prerequisite
 * observable has finished.
 *
 * @param {Observable<any>} sourceObservable - The observable whose completion triggers forwarding.
 * @returns {function(Observable<any>): Observable<any>} - Operator function to be used in a pipe.
 */
function subscribeOnConditionAfterSourceCompletes(sourceObservable) {
  return tk9.operate(function (inputObservable, subscriber) {
    let sourceCompleted = false;

    // Create a subscriber for the source observable
    const sourceSubscriber = ALA.createOperatorSubscriber(
      subscriber,
      function onSourceComplete() {
        // Unsubscribe from the source and mark as completed
        if (sourceSubscriber) {
          sourceSubscriber.unsubscribe();
        }
        sourceCompleted = true;
      },
      Ay9.noop
    );

    // Subscribe to the source observable
    ek9.innerFrom(sourceObservable).subscribe(sourceSubscriber);

    // Subscribe to the input observable, but only forward values if the source has completed
    inputObservable.subscribe(
      ALA.createOperatorSubscriber(
        subscriber,
        function onNextInput(value) {
          if (sourceCompleted) {
            subscriber.next(value);
          }
        }
      )
    );
  });
}

module.exports = subscribeOnConditionAfterSourceCompletes;