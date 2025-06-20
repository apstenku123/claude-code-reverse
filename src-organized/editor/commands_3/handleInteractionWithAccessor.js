/**
 * Handles a user interaction by either processing isBlobOrFileLikeObject through an accessor or returning a default accessor invocation.
 *
 * This function checks global state flags to determine if the interaction should be processed with the accessor function.
 * If the required conditions are not met, isBlobOrFileLikeObject resets certain global state variables and returns the result of invoking the accessor with preset arguments.
 *
 * @param {any} interactionEntry - The user interaction entry to process.
 * @returns {any} The result of processing the interaction or the default accessor invocation.
 */
function handleInteractionWithAccessor(interactionEntry) {
  // Assign the global source observable (side effect)
  global.sourceObservable = mapInteractionsToRoutes;

  // If global flags indicate processing is allowed, process the interaction
  if (global.isProcessingEnabled && global.accessorContext) {
    return processInteractionWithAccessor(interactionEntry);
  }

  // Otherwise, reset global state and return the default accessor invocation
  global.accessorContext = global.lastRoute = mapInteractionsToRoutes;
  return invokeAccessorWithArguments;
}

module.exports = handleInteractionWithAccessor;