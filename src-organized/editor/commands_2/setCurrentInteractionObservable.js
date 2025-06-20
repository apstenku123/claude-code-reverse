/**
 * Sets the current interaction observable to the provided observable.
 * This function updates the module-scoped variable `currentInteractionObservable` with the given observable,
 * which is used elsewhere to track or process user interactions.
 *
 * @param {Observable} interactionObservable - The observable representing user interactions to be tracked.
 * @returns {void}
 */
const setCurrentInteractionObservable = (interactionObservable) => {
  // Assign the provided observable to the module-scoped variable
  currentInteractionObservable = interactionObservable;
};

module.exports = setCurrentInteractionObservable;
