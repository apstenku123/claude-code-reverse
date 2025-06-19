/**
 * Applies a conditional emission operator to an Observable stream.
 *
 * This operator takes a predicate function and emits each value from the source Observable
 * as long as the predicate returns true. If the predicate returns false, the stream completes.
 * Optionally, you can configure the operator to emit the value that caused the predicate to fail
 * before completing.
 *
 * @param {function(value: any, index: number): boolean} predicateFn - Function to test each source value. Receives the value and its index.
 * @param {boolean} [emitOnFail=false] - If true, emits the value that causes the predicate to fail before completing.
 * @returns {function(sourceObservable: Observable): Observable} An operator function to be used with Observable.pipe().
 */
function conditionalEmitOperator(predicateFn, emitOnFail = false) {
  return Ly9.operate(function (sourceObservable, subscriber) {
    let index = 0;
    sourceObservable.subscribe(
      Ry9.createOperatorSubscriber(subscriber, function (value) {
        // Evaluate the predicate function with the current value and index
        const shouldEmit = predicateFn(value, index++);
        // Emit the value if predicate passes, or if emitOnFail is true
        if (shouldEmit || emitOnFail) {
          subscriber.next(value);
        }
        // Complete the stream if predicate fails
        if (!shouldEmit) {
          subscriber.complete();
        }
      })
    );
  });
}

module.exports = conditionalEmitOperator;