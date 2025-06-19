/**
 * Handles a user interaction by updating global state and invoking the appropriate accessor function.
 * Depending on the global flag `isInteractionMode`, isBlobOrFileLikeObject either processes the interaction or returns a default accessor result.
 *
 * @param {any} userInteractionEntry - The user interaction entry to process.
 * @returns {any} The result of processing the interaction or the default accessor result.
 */
function handleUserInteractionWithAccessor(userInteractionEntry) {
  // Update global state with the current user interaction entry
  globalCurrentInteractionEntry = userInteractionEntry;

  // Update another piece of global state by invoking a dependency with preset arguments
  globalInteractionState = getInteractionState(globalInteractionConfig, globalInteractionPreset);

  // If in interaction mode, process the interaction; otherwise, return the default accessor result
  if (isInteractionMode) {
    return processInteractionWithAccessor(userInteractionEntry);
  } else {
    return invokeAccessorWithArguments;
  }
}

module.exports = handleUserInteractionWithAccessor;