/**
 * Determines if the result of AL6 is non-negative for the given parameters.
 *
 * @param {Object} sourceObservable - The source observable or data input to be evaluated.
 * @param {Object} config - Configuration object or parameters for the AL6 calculation.
 * @param {Object} subscription - Subscription or context object used by AL6.
 * @returns {boolean} Returns true if AL6 returns a value greater than or equal to 0; otherwise, false.
 */
const isAl6ResultNonNegative = (sourceObservable, config, subscription) => {
  // Call AL6 with the provided arguments and check if the result is non-negative
  return AL6(sourceObservable, config, subscription) >= 0;
};

module.exports = isAl6ResultNonNegative;
