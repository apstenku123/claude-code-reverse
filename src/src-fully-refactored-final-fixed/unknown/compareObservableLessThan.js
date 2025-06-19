/**
 * Compares values from a source observable to a configuration using the '<' (less than) operator.
 * Delegates the comparison logic to the GR6 function.
 *
 * @param {Observable} sourceObservable - The observable whose values will be compared.
 * @param {Object} comparisonConfig - Configuration object for the comparison operation.
 * @param {Object} subscription - Subscription or context object for the comparison.
 * @returns {any} The result of the GR6 comparison operation.
 */
const compareObservableLessThan = (sourceObservable, comparisonConfig, subscription) => {
  // Delegate to GR6 with the '<' operator
  return GR6(sourceObservable, comparisonConfig, '<', subscription);
};

module.exports = compareObservableLessThan;
