/**
 * Ensures that the route interaction for a given observable is initialized and processed.
 *
 * This function first processes the observable and configuration using the external `addEntryToObservableCollection` function.
 * If the observable has not yet been initialized (as tracked by the `j91` map), isBlobOrFileLikeObject initializes isBlobOrFileLikeObject
 * using the external `observeAndProcessEntries` function and marks isBlobOrFileLikeObject as initialized. Finally, isBlobOrFileLikeObject returns the result of
 * processing the observable and configuration with the external `createInteractionEntryRemover` function.
 *
 * @param {string} sourceObservable - The key or identifier for the observable to process.
 * @param {object} config - Configuration object or parameters for processing the observable.
 * @returns {any} The result of processing the observable and configuration via `createInteractionEntryRemover`.
 */
function ensureRouteInteractionInitialized(sourceObservable, config) {
  // Process the observable and config (side effects may occur)
  addEntryToObservableCollection(sourceObservable, config);

  // If this observable hasn'processRuleBeginHandlers been initialized yet
  if (!j91[sourceObservable]) {
    // Initialize the observable
    observeAndProcessEntries(sourceObservable);
    // Mark as initialized
    j91[sourceObservable] = true;
  }

  // Return the result of further processing
  return createInteractionEntryRemover(sourceObservable, config);
}

module.exports = ensureRouteInteractionInitialized;