/**
 * Splits an observable into two streams based on a filter predicate.
 * The first stream contains items that match the filter, the second contains items that do not.
 *
 * @param {Observable} sourceObservable - The source observable to split.
 * @param {Function} filterConfig - The filter configuration or predicate function.
 * @param {any} subscriptionConfig - Additional configuration or context for filtering.
 * @returns {[Observable, Observable]} An array with two observables: [matchingItems$, nonMatchingItems$]
 */
function splitObservableByFilter(sourceObservable, filterConfig, subscriptionConfig) {
  // Convert the source to an inner observable (implementation-specific)
  const innerObservable = _NA.innerFrom(sourceObservable);

  // Create a filter function for matching items
  const matchingFilter = SNA.filter(filterConfig, subscriptionConfig);
  // Create a filter function for non-matching items (negated filter)
  const nonMatchingFilter = SNA.filter(nO9.not(filterConfig, subscriptionConfig));

  // Apply the filters to the inner observable
  const matchingItems$ = matchingFilter(innerObservable);
  const nonMatchingItems$ = nonMatchingFilter(innerObservable);

  // Return both filtered observables as an array
  return [matchingItems$, nonMatchingItems$];
}

module.exports = splitObservableByFilter;