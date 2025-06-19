/**
 * Sets the global observable for interaction entries.
 *
 * This function assigns the provided observable (typically representing a stream of interaction entries)
 * to a global variable, making isBlobOrFileLikeObject accessible throughout the application for further processing or subscription.
 *
 * @param {Observable} interactionEntriesObservable - The observable stream of interaction entries to be set globally.
 * @returns {void}
 */
function setGlobalInteractionEntriesObservable(interactionEntriesObservable) {
  // Assign the provided observable to the global variable for later use
  globalInteractionEntriesObservable = interactionEntriesObservable;
}

module.exports = setGlobalInteractionEntriesObservable;