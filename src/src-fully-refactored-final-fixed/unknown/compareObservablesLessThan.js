/**
 * Compares two observables using the '<' (less than) operator within a given subscription context.
 * Delegates the actual comparison logic to the GR6 function.
 *
 * @param {Observable} sourceObservable - The first observable to compare.
 * @param {Object} config - Configuration object for the comparison.
 * @param {Subscription} subscription - The subscription context for the comparison.
 * @returns {any} The result of the GR6 comparison operation.
 */
const compareObservablesLessThan = (sourceObservable, config, subscription) => {
  // Delegate the comparison to GR6 with the '<' operator
  return GR6(sourceObservable, config, '<', subscription);
};

module.exports = compareObservablesLessThan;
