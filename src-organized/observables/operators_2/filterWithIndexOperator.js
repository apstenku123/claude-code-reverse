/**
 * Applies a filtering operator to an Observable, passing the current value and its index to the predicate function.
 * Only values for which the predicate returns true are emitted to the subscriber.
 *
 * @param {Function} predicate - The function to test each source value. Called with (value, index).
 * @param {Object} [thisArg] - Optional context to bind as `this` when calling the predicate.
 * @returns {Function} An operator function to be used with Observable'createInteractionAccessor pipe method.
 */
function filterWithIndexOperator(predicate, thisArg) {
  return cO9.operate(function (sourceObservable, subscriber) {
    let index = 0;
    // Subscribe to the source observable
    sourceObservable.subscribe(
      lO9.createOperatorSubscriber(
        subscriber,
        function (value) {
          // Call the predicate with the current value and index
          // If predicate returns true, emit the value to the subscriber
          if (predicate.call(thisArg, value, index++)) {
            subscriber.next(value);
          }
        }
      )
    );
  });
}

module.exports = filterWithIndexOperator;