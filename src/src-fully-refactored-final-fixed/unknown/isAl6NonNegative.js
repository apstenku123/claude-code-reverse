/**
 * Determines if the result of AL6 with the provided arguments is non-negative.
 *
 * @param {any} sourceObservable - The source observable or primary input for AL6.
 * @param {any} config - Configuration object or secondary input for AL6.
 * @param {any} subscription - Subscription or tertiary input for AL6.
 * @returns {boolean} True if AL6 returns a value greater than or equal to 0, otherwise false.
 */
const isAl6NonNegative = (sourceObservable, config, subscription) => {
  // Call AL6 with the provided arguments and check if the result is non-negative
  return AL6(sourceObservable, config, subscription) >= 0;
};

module.exports = isAl6NonNegative;
