/**
 * Checks if the result of rM6 with the given parameters is zero.
 *
 * @param {Object} sourceObservable - The source observable object to be processed.
 * @param {Object} config - Configuration object for rM6 processing.
 * @param {Object} subscription - Subscription object related to the observable.
 * @returns {boolean} Returns true if rM6 returns 0, otherwise false.
 */
const isRM6ResultZero = (sourceObservable, config, subscription) => {
  // Call rM6 with the provided parameters and check if the result is zero
  return rM6(sourceObservable, config, subscription) === 0;
};

module.exports = isRM6ResultZero;