/**
 * Filters the given observable using the provided configuration and a 'greater than' operator.
 * Delegates the operation to the QR6 utility function.
 *
 * @param {Observable} sourceObservable - The observable to be filtered.
 * @param {Object} filterConfig - Configuration object specifying filter criteria.
 * @param {Object} subscriptionOptions - Additional options for the subscription process.
 * @returns {any} The result of the QR6 function, typically a filtered observable or subscription result.
 */
const filterObservableWithConfig = (sourceObservable, filterConfig, subscriptionOptions) => {
  // Use QR6 to filter the observable with the '>' operator
  return QR6(sourceObservable, filterConfig, '>', subscriptionOptions);
};

module.exports = filterObservableWithConfig;
