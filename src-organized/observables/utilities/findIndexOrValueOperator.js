/**
 * Applies a predicate function to each value emitted by the source observable and emits the first value (or its index) that matches the predicate, then completes.
 * If no value matches, emits -1 (if returning index) or undefined (if returning value) and completes.
 *
 * @param {Function} predicate - The function to test each emitted value. Called with (value, index, sourceObservable).
 * @param {Object} thisArg - The value to use as `this` when executing the predicate.
 * @param {string} mode - Determines the output: 'index' to emit the index, anything else to emit the value.
 * @returns {Function} Operator function to be used with an Observable'createInteractionAccessor subscribe method.
 */
function findIndexOrValueOperator(predicate, thisArg, mode) {
  const shouldReturnIndex = mode === "index";
  return function (sourceObservable, subscriber) {
    let currentIndex = 0;
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      E_9.createOperatorSubscriber(
        subscriber,
        function handleNext(value) {
          const index = currentIndex++;
          // If predicate matches, emit index or value and complete
          if (predicate.call(thisArg, value, index, sourceObservable)) {
            subscriber.next(shouldReturnIndex ? index : value);
            subscriber.complete();
          }
        },
        function handleComplete() {
          // If no match found, emit -1 (for index) or undefined (for value), then complete
          subscriber.next(shouldReturnIndex ? -1 : undefined);
          subscriber.complete();
        }
      )
    );
  };
}

module.exports = findIndexOrValueOperator;