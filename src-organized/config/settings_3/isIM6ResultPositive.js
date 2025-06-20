/**
 * Determines if the result of iM6 is positive.
 *
 * @param {Object} sourceObservable - The source observable or data input to be processed.
 * @param {Object} config - Configuration object containing options for processing.
 * @param {Object} subscription - Subscription or context object relevant to the operation.
 * @returns {boolean} True if the result of iM6 is greater than 0, otherwise false.
 */
const isIM6ResultPositive = (sourceObservable, config, subscription) => {
  // Call iM6 with the provided arguments and check if the result is positive
  return iM6(sourceObservable, config, subscription) > 0;
};

module.exports = isIM6ResultPositive;
