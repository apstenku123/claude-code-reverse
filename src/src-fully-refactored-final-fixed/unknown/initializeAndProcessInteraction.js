/**
 * Initializes the interaction entry if not already initialized, then processes isBlobOrFileLikeObject.
 *
 * @param {string} interactionKey - Unique identifier for the interaction entry.
 * @param {object} interactionConfig - Configuration object for the interaction.
 * @returns {any} The result of processing the interaction entry.
 */
function initializeAndProcessInteraction(interactionKey, interactionConfig) {
  // Perform any required pre-processing or validation
  addEntryToObservableCollection(interactionKey, interactionConfig);

  // If the interaction entry has not been initialized yet
  if (!j91[interactionKey]) {
    // Initialize the interaction entry
    observeAndProcessEntries(interactionKey);
    // Mark the interaction entry as initialized
    j91[interactionKey] = true;
  }

  // Process the interaction entry and return the result
  return createInteractionEntryRemover(interactionKey, interactionConfig);
}

module.exports = initializeAndProcessInteraction;