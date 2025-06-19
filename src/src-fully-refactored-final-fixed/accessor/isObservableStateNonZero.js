/**
 * Determines whether the state of an observable, given its configuration and subscription, is non-zero.
 *
 * This function delegates to the tM6 function, which performs the actual state check.
 *
 * @param {Object} sourceObservable - The observable object whose state is being checked.
 * @param {Object} config - The configuration object for the observable.
 * @param {Object} subscription - The subscription object associated with the observable.
 * @returns {boolean} Returns true if the observable'createInteractionAccessor state is non-zero, false otherwise.
 */
const isObservableStateNonZero = (sourceObservable, config, subscription) => {
  // Call tM6 to determine the state; return true if non-zero, false otherwise
  return tM6(sourceObservable, config, subscription) !== 0;
};

module.exports = isObservableStateNonZero;