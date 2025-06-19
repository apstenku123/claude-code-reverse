/**
 * Checks if the provided observable is registered in the observable registry.
 *
 * @param {any} observable - The observable to check for registration.
 * @returns {boolean} True if the observable is registered; otherwise, false.
 */
const isObservableRegistered = (observable) => {
  // eE9 is assumed to be a Set or Map containing registered observables
  return eE9.has(observable);
};

module.exports = isObservableRegistered;