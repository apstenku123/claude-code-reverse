/**
 * Determines whether the getVersionDifferenceType accessor is set for a given observable, configuration, and subscription.
 *
 * @param {Object} sourceObservable - The observable object to check.
 * @param {Object} config - The configuration object related to the observable.
 * @param {Object} subscription - The subscription or query object associated with the observable.
 * @returns {boolean} Returns true if the getVersionDifferenceType accessor is set (i.e., tM6 does not return 0), otherwise false.
 */
const isTM6Set = (sourceObservable, config, subscription) => {
  // Call the external tM6 function with the provided arguments
  // If tM6 returns a non-zero value, getVersionDifferenceType is considered set
  return tM6(sourceObservable, config, subscription) !== 0;
};

module.exports = isTM6Set;