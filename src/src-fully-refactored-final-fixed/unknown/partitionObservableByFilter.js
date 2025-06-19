/**
 * Partitions the items emitted by the source observable into two arrays:
 * one containing items that match the filter criteria, and one containing items that do not.
 *
 * @param {Observable} sourceObservable - The observable whose items will be partitioned.
 * @param {Object} filterConfig - The configuration or predicate used for filtering.
 * @param {any} subscriptionContext - Additional context or parameters for the filter function.
 * @returns {Array<Array<any>>} An array with two arrays: [matchedItems, unmatchedItems].
 */
function partitionObservableByFilter(sourceObservable, filterConfig, subscriptionContext) {
  // Convert the source to an internal observable representation
  const internalObservable = _NA.innerFrom(sourceObservable);

  // Filter items that match the filterConfig and subscriptionContext
  const matchedItems = SNA.filter(filterConfig, subscriptionContext)(internalObservable);

  // Filter items that do NOT match the filterConfig and subscriptionContext
  const unmatchedItems = SNA.filter(nO9.not(filterConfig, subscriptionContext))(internalObservable);

  // Return both arrays as a tuple
  return [matchedItems, unmatchedItems];
}

module.exports = partitionObservableByFilter;