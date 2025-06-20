/**
 * Determines if the value from the source observable is less than a comparison value, using the GR6 helper.
 *
 * @param {Observable} sourceObservable - The observable whose emitted values will be compared.
 * @param {Object} comparisonConfig - Configuration object specifying the value to compare against or comparison logic.
 * @param {Object} subscriptionOptions - Additional options for the subscription or operator behavior.
 * @returns {any} The result of the GR6 function, which applies the '<' (less than) operator logic.
 */
const isLessThanOperator = (sourceObservable, comparisonConfig, subscriptionOptions) => {
  // Delegate the comparison logic to GR6, specifying the '<' operator
  return GR6(sourceObservable, comparisonConfig, '<', subscriptionOptions);
};

module.exports = isLessThanOperator;
