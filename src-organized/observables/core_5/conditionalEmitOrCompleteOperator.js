/**
 * Applies a conditional operator to an Observable stream, emitting values based on a predicate function.
 * If the predicate returns false, the stream completes unless the alwaysEmitOnFalse flag is set.
 *
 * @param {function(value: any, index: number): boolean} predicate - Function to test each emitted value. Receives the value and its index.
 * @param {boolean} [alwaysEmitOnFalse=false] - If true, emits the value even when the predicate returns false before completing.
 * @returns {function(sourceObservable: Observable): Observable} Operator function to be used with Observable'createInteractionAccessor pipe method.
 */
function conditionalEmitOrCompleteOperator(predicate, alwaysEmitOnFalse = false) {
  return Ly9.operate((sourceObservable, subscriber) => {
    let index = 0;
    // Subscribe to the source observable
    sourceObservable.subscribe(
      Ry9.createOperatorSubscriber(
        subscriber,
        (value) => {
          // Apply the predicate to the current value and index
          const shouldEmit = predicate(value, index++);
          // Emit the value if predicate passes or alwaysEmitOnFalse is true
          if (shouldEmit || alwaysEmitOnFalse) {
            subscriber.next(value);
          }
          // Complete the stream if predicate fails
          if (!shouldEmit) {
            subscriber.complete();
          }
        }
      )
    );
  });
}

module.exports = conditionalEmitOrCompleteOperator;