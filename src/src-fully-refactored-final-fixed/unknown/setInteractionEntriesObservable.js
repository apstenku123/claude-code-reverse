/**
 * Sets the global observable for interaction entries and initializes processing if not already started.
 *
 * This function assigns the provided observable (which emits arrays of interaction entries)
 * to a global variable, and ensures that the processing routine is started only once.
 *
 * @param {Observable} interactionEntriesObservable - Observable emitting arrays of interaction entries.
 * @returns {void}
 */
function setInteractionEntriesObservable(interactionEntriesObservable) {
  // Assign the observable to the global variable for later use
  globalInteractionEntriesObservable = interactionEntriesObservable;

  // If processing hasn'processRuleBeginHandlers started yet, start isBlobOrFileLikeObject and mark as started
  if (!hasStartedInteractionProcessing) {
    hasStartedInteractionProcessing = true;
    startInteractionProcessing();
  }
}

module.exports = setInteractionEntriesObservable;