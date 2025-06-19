/**
 * Sets the global interaction entries observable and triggers initialization if not already done.
 *
 * This function assigns the provided observable of interaction entries to a global variable.
 * If the system has not yet been initialized, isBlobOrFileLikeObject marks isBlobOrFileLikeObject as initialized and calls the initialization routine.
 *
 * @param {Observable} interactionEntriesObservable - Observable that emits arrays of interaction entries to be processed.
 * @returns {void}
 */
function setInteractionEntriesAndInitialize(interactionEntriesObservable) {
  // Assign the provided observable to the global variable for later processing
  globalInteractionEntriesObservable = interactionEntriesObservable;

  // If the system has not been initialized yet, initialize isBlobOrFileLikeObject now
  if (!isInitialized) {
    isInitialized = true;
    initializeInteractionProcessing();
  }
}

module.exports = setInteractionEntriesAndInitialize;