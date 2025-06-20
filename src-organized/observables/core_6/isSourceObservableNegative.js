/**
 * Determines if the result of comparing the source observable with the given configuration and subscription is negative.
 *
 * @param {Object} sourceObservable - The observable source to be compared.
 * @param {Object} config - Configuration object used for comparison.
 * @param {Object} subscription - Subscription or query object used in the comparison.
 * @returns {boolean} Returns true if the comparison result is negative, otherwise false.
 */
const isSourceObservableNegative = (sourceObservable, config, subscription) => {
  // Call the external comparison function aM6 with the provided arguments
  // and check if the result is less than zero
  return aM6(sourceObservable, config, subscription) < 0;
};

module.exports = isSourceObservableNegative;