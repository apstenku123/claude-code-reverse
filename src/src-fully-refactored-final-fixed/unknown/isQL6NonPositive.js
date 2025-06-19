/**
 * Determines if the result of QL6 with the given parameters is non-positive (<= 0).
 *
 * @param {Observable} sourceObservable - The source observable to be processed by QL6.
 * @param {Object} config - Configuration object passed to QL6.
 * @param {Subscription} subscription - Subscription or context object for QL6.
 * @returns {boolean} True if QL6 returns a value less than or equal to zero, otherwise false.
 */
const isQL6NonPositive = (sourceObservable, config, subscription) => {
  // Call QL6 with the provided arguments and check if the result is non-positive
  return QL6(sourceObservable, config, subscription) <= 0;
};

module.exports = isQL6NonPositive;
