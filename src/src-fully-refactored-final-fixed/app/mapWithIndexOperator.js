/**
 * Applies a mapping function to each value emitted by the source Observable, passing the value and its index.
 * The mapping function is called with the provided context.
 *
 * @param {Function} mapFunction - The function to apply to each emitted value and its index.
 * @param {Object} [thisArg] - Optional context to bind as 'this' when calling mapFunction.
 * @returns {Function} An operator function to be used with an Observable.
 */
function mapWithIndexOperator(mapFunction, thisArg) {
  return vL9.operate(function (sourceObservable, subscriber) {
    let index = 0;
    // Subscribe to the source observable
    sourceObservable.subscribe(
      bL9.createOperatorSubscriber(
        subscriber,
        /**
         * For each value emitted by the source, apply the mapping function
         * with the current index, then emit the result.
         */
        function (value) {
          subscriber.next(mapFunction.call(thisArg, value, index++));
        }
      )
    );
  });
}

module.exports = mapWithIndexOperator;