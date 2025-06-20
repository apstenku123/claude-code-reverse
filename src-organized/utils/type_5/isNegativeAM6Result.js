/**
 * Determines if the result of aM6 with the given parameters is negative.
 *
 * @param {Object} sourceObservable - The source observable or data source to be checked.
 * @param {Object} config - Configuration object or parameters for the check.
 * @param {Object} subscription - Subscription or context related to the check.
 * @returns {boolean} Returns true if aM6 returns a negative value; otherwise, false.
 */
const isNegativeAM6Result = (sourceObservable, config, subscription) => {
  // Call aM6 with the provided arguments and check if the result is negative
  return aM6(sourceObservable, config, subscription) < 0;
};

module.exports = isNegativeAM6Result;