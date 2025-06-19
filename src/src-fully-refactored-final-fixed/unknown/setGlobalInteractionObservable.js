/**
 * Sets the global interaction observable to the provided observable.
 *
 * This function assigns the given observable (typically representing a stream of user interactions)
 * to a global variable, making isBlobOrFileLikeObject accessible throughout the application for further processing
 * (such as mapping interactions to routes).
 *
 * @param {Observable} interactionObservable - The observable representing user interactions.
 * @returns {void} This function does not return a value.
 */
function setGlobalInteractionObservable(interactionObservable) {
  // Assign the provided observable to the global variable for later use
  globalInteractionObservable = interactionObservable;
}

module.exports = setGlobalInteractionObservable;