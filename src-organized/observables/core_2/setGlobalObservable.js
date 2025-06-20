/**
 * Sets the global observable reference.
 *
 * This function assigns the provided observable to the global variable `globalObservableReference`.
 * It is typically used to update the reference to the current observable in use.
 *
 * @param {any} observable - The observable to set as the global reference.
 * @returns {void}
 */
const setGlobalObservable = (observable) => {
  // Assign the provided observable to the global reference
  globalObservableReference = observable;
};

module.exports = setGlobalObservable;
