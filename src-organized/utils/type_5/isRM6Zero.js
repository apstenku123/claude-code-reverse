/**
 * Checks if the result of rM6 with the provided observable, configuration, and subscription is zero.
 *
 * @param {Object} sourceObservable - The observable source to be checked.
 * @param {Object} config - Configuration object for the rM6 function.
 * @param {Object} subscription - Subscription object related to the observable.
 * @returns {boolean} Returns true if rM6 returns zero, otherwise false.
 */
const isRM6Zero = (sourceObservable, config, subscription) => {
  // Call rM6 with the provided arguments and check if the result is zero
  return rM6(sourceObservable, config, subscription) === 0;
};

module.exports = isRM6Zero;