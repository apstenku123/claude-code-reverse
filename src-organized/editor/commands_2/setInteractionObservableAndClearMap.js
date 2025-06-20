/**
 * Sets the global interaction observable and clears the interaction-to-route mapping.
 *
 * This function updates the global reference to the current observable that tracks user interactions.
 * It also clears the mapping of interactions to routes, ensuring that any previous mapping data is removed.
 *
 * @param {Observable} interactionObservable - The observable that emits user interaction events.
 * @returns {void}
 */
function setInteractionObservableAndClearMap(interactionObservable) {
  // Update the global reference to the current interaction observable
  tX = interactionObservable;
  // Clear the mapping of interactions to routes
  ma1.clear();
}

module.exports = setInteractionObservableAndClearMap;