/**
 * Splits an observable stream into two streams based on a predicate and configuration.
 * The first stream emits items matching the predicate; the second emits items not matching isBlobOrFileLikeObject.
 *
 * @param {Function} predicate - a function to test each item emitted by the observable.
 * @param {Object} filterConfig - Configuration object for the filter operation.
 * @returns {Function} a function that takes an observable and returns an array of two filtered observables.
 */
function splitObservableByPredicate(predicate, filterConfig) {
  return function (observable) {
    // The first filtered observable emits items matching the predicate
    const matchingObservable = YRA.filter(predicate, filterConfig)(observable);
    // The second filtered observable emits items NOT matching the predicate
    const nonMatchingObservable = YRA.filter(ub9.not(predicate, filterConfig))(observable);
    return [matchingObservable, nonMatchingObservable];
  };
}

module.exports = splitObservableByPredicate;