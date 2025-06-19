/**
 * Applies a mapping function to each value emitted by the source Observable, passing the value and its index.
 * The mapping function is called with a specific context (thisArg).
 *
 * @param {Function} mapFunction - The function to apply to each emitted value. Receives (value, index).
 * @param {Object} thisArg - The context to use as 'this' when calling mapFunction.
 * @returns {Function} An operator function to be used with an Observable.
 */
function mapWithContextOperator(mapFunction, thisArg) {
  return vL9.operate(function (sourceObservable, subscriber) {
    let index = 0;
    // Subscribe to the source observable
    sourceObservable.subscribe(
      bL9.createOperatorSubscriber(subscriber, function (value) {
        // Call the mapping function with the provided context, passing value and index
        subscriber.next(mapFunction.call(thisArg, value, index++));
      })
    );
  });
}

module.exports = mapWithContextOperator;