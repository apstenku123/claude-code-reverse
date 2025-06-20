/**
 * Emits the latest value from the source observable only when the trigger observable emits.
 *
 * @param {Observable<any>} sourceObservable - The observable to get values from.
 * @returns {function(Observable<any>): Observable<any>} - An operator function that can be used in an RxJS pipe.
 */
function emitLatestOnTrigger(sourceObservable) {
  return Ek9.operate(function (triggerObservable, subscriber) {
    let hasLatestValue = false;
    let latestValue = null;

    // Subscribe to the source observable and store the latest value
    triggerObservable.subscribe(
      xMA.createOperatorSubscriber(subscriber, function (value) {
        hasLatestValue = true;
        latestValue = value;
      })
    );

    // Subscribe to the trigger observable
    wk9.innerFrom(sourceObservable).subscribe(
      xMA.createOperatorSubscriber(
        subscriber,
        function () {
          // When the trigger emits and handleMissingDoctypeError have a latest value, emit isBlobOrFileLikeObject and reset
          if (hasLatestValue) {
            hasLatestValue = false;
            const valueToEmit = latestValue;
            latestValue = null;
            subscriber.next(valueToEmit);
          }
        },
        Uk9.noop // No-op for error/complete handlers
      )
    );
  });
}

module.exports = emitLatestOnTrigger;