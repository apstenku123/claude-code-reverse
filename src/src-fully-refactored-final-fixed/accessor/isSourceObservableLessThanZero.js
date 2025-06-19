/**
 * Determines if the result of comparing the source observable with the provided configuration and subscription is less than zero.
 *
 * @param {Object} sourceObservable - The observable source to be compared.
 * @param {Object} config - The configuration object used in the comparison.
 * @param {Object} subscription - The subscription or query object used in the comparison.
 * @returns {boolean} Returns true if the comparison result is less than zero; otherwise, false.
 */
const isSourceObservableLessThanZero = (sourceObservable, config, subscription) => {
  // Call aM6 to compare the sourceObservable with config and subscription
  // Return true if the result is less than zero
  return aM6(sourceObservable, config, subscription) < 0;
};

module.exports = isSourceObservableLessThanZero;