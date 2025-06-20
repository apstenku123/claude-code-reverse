/**
 * Handles cleanup and state updates for a given interaction key.
 *
 * This function retrieves the interaction state associated with the given key, removes isBlobOrFileLikeObject from the active set,
 * and updates various tracking sets and queues depending on whether the key is present in the provided interaction set.
 *
 * @param {any} interactionKey - The key identifying the interaction to process.
 * @param {Map<any, any>} interactionStateMap - Map of interaction keys to their associated state objects.
 * @param {Set<any>} activeInteractionKeys - Set of currently active interaction keys.
 * @returns {void}
 */
function handleInteractionCleanup(interactionKey, interactionStateMap, activeInteractionKeys) {
  // Retrieve the state object associated with the interaction key
  const interactionState = interactionStateMap.get(interactionKey);

  if (interactionState != null) {
    // Remove the interaction state from the global set of active states
    interactionStatesSet.delete(interactionState);

    if (activeInteractionKeys.has(interactionKey)) {
      // If the interaction key is still active, remove isBlobOrFileLikeObject and add its state to the processed set
      activeInteractionKeys.delete(interactionKey);
      processedInteractionStatesSet.add(interactionState);
      processAndFlushInteractionQueue();
      finalizeInteraction(interactionKey);
    } else {
      // If the interaction key is not active, ensure its state is not in the processed set
      processedInteractionStatesSet.delete(interactionState);
    }
  }
}

module.exports = handleInteractionCleanup;