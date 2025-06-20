/**
 * Splits an observable stream into two streams based on a filter condition.
 * The first stream passes items that match the filter, the second passes items that do not.
 *
 * @param {Observable} sourceObservable - The observable to be filtered.
 * @param {Object} filterConfig - Configuration or predicate for the filter.
 * @returns {function(Subscription): [Observable, Observable]} - a function that, given a subscription, returns an array of two observables: [matching, nonMatching].
 */
function splitByFilter(sourceObservable, filterConfig) {
  return function (subscription) {
    // Apply the filter to get items that match the condition
    const matchingObservable = YRA.filter(sourceObservable, filterConfig)(subscription);
    // Apply the negated filter to get items that do NOT match the condition
    const nonMatchingObservable = YRA.filter(ub9.not(sourceObservable, filterConfig))(subscription);
    return [matchingObservable, nonMatchingObservable];
  };
}

module.exports = splitByFilter;