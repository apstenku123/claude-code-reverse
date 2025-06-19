/**
 * Determines if the relation between the given observable, configuration, and subscription is zero.
 *
 * This function delegates to the external `rM6` function, which computes a numeric relation
 * between the provided observable, its configuration, and a subscription. It returns `true`
 * if the result of `rM6` is exactly zero, and `false` otherwise.
 *
 * @param {Object} sourceObservable - The observable object to check the relation for.
 * @param {Object} config - The configuration object associated with the observable.
 * @param {Object} subscription - The subscription object to be evaluated.
 * @returns {boolean} Returns true if the relation is zero, otherwise false.
 */
const isObservableRelationZero = (sourceObservable, config, subscription) => {
  // Call rM6 to compute the relation; return true if the result is zero
  return rM6(sourceObservable, config, subscription) === 0;
};

module.exports = isObservableRelationZero;
