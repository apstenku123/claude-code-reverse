/**
 * Splits a subscription into two based on a filtering condition.
 *
 * @param {Observable} sourceObservable - The source observable to filter.
 * @param {Object} filterConfig - The configuration or predicate for filtering.
 * @returns {function(subscription: any): [any, any]} - a function that takes a subscription and returns an array with two filtered results: [matching, notMatching].
 */
function splitSubscriptionByFilter(sourceObservable, filterConfig) {
  return function (subscription) {
    // Apply the filter to get items matching the filterConfig
    const matching = YRA.filter(sourceObservable, filterConfig)(subscription);
    // Apply the negated filter to get items NOT matching the filterConfig
    const notMatching = YRA.filter(ub9.not(sourceObservable, filterConfig))(subscription);
    return [matching, notMatching];
  };
}

module.exports = splitSubscriptionByFilter;