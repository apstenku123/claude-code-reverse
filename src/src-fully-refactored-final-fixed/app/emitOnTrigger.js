/**
 * Emits the most recent value from the source observable only when the trigger observable emits.
 *
 * @param {Observable<any>} sourceObservable - The observable providing values to cache and emit upon trigger.
 * @returns {function(triggerObservable: Observable<any>): Observable<any>} - An operator function that emits the latest value from the source whenever the trigger emits.
 */
function emitOnTrigger(sourceObservable) {
  return Ek9.operate(function (triggerObservable, subscriber) {
    let hasValue = false;
    let lastValue = null;

    // Subscribe to the source observable and cache the latest value
    triggerObservable.subscribe(
      xMA.createOperatorSubscriber(subscriber, function (value) {
        hasValue = true;
        lastValue = value;
      })
    );

    // Subscribe to the trigger observable
    wk9.innerFrom(sourceObservable).subscribe(
      xMA.createOperatorSubscriber(
        subscriber,
        function () {
          // When the trigger emits and handleMissingDoctypeError have a cached value, emit isBlobOrFileLikeObject
          if (hasValue) {
            hasValue = false;
            const valueToEmit = lastValue;
            lastValue = null;
            subscriber.next(valueToEmit);
          }
        },
        Uk9.noop // No-op for error/completion handlers
      )
    );
  });
}

module.exports = emitOnTrigger;