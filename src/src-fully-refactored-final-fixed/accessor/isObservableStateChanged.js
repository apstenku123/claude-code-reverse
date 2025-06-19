/**
 * Determines whether the state of the observable has changed based on the provided configuration and subscription.
 *
 * @param {Object} sourceObservable - The observable object whose state is being checked.
 * @param {Object} config - The configuration object used to determine state changes.
 * @param {Object} subscription - The subscription object related to the observable.
 * @returns {boolean} Returns true if the observable state has changed, otherwise false.
 */
const isObservableStateChanged = (sourceObservable, config, subscription) => {
  // tM6 is assumed to be an imported function that checks for state changes
  // Returns true if tM6 does not return 0 (i.e., a change is detected)
  return tM6(sourceObservable, config, subscription) !== 0;
};

module.exports = isObservableStateChanged;
