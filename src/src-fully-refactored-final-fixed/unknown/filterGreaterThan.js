/**
 * Filters values from the source observable that are greater than a specified threshold.
 * Delegates the filtering logic to the QR6 function with the '>' operator.
 *
 * @param {Observable} sourceObservable - The observable stream to filter.
 * @param {Object} config - Configuration object for the filtering operation.
 * @param {Object} subscription - Subscription or context object for the operation.
 * @returns {any} The result of the QR6 filtering operation.
 */
const filterGreaterThan = (sourceObservable, config, subscription) => {
  // Call QR6 with the '>' operator to filter values greater than a threshold
  return QR6(sourceObservable, config, '>', subscription);
};

module.exports = filterGreaterThan;
