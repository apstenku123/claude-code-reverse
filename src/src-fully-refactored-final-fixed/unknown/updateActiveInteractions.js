/**
 * Updates the list of active interactions based on a sequence of interaction events.
 *
 * This function processes a list of interaction events and updates the current active interactions accordingly:
 * - If an event is a reset, all active interactions are cleared.
 * - If an event'createInteractionAccessor code is in the set of codes to remove (LI1), all interactions with a matching endCode are removed.
 * - Otherwise, all interactions with a matching endCode or matching event'createInteractionAccessor endCode are removed, and the event is added to the active list.
 *
 * @param {Array<Object>} currentInteractions - The current list of active interaction objects.
 * @param {Array<Object>} interactionEvents - The list of interaction event objects to process.
 * @returns {Array<Object>} The updated list of active interactions after processing all events.
 */
function updateActiveInteractions(currentInteractions, interactionEvents) {
  // Clone the current interactions to avoid mutating the input array
  let activeInteractions = [...currentInteractions];

  for (const event of interactionEvents) {
    // If the event is a reset, clear all active interactions
    if (event.code === lB.reset.open) {
      activeInteractions = [];
    }
    // If the event'createInteractionAccessor code is in the set of codes to remove, remove matching interactions
    else if (LI1.has(event.code)) {
      activeInteractions = activeInteractions.filter(
        interaction => interaction.endCode !== event.code
      );
    }
    // Otherwise, remove interactions with matching endCode and add the new event
    else {
      activeInteractions = activeInteractions.filter(
        interaction => interaction.endCode !== event.endCode
      );
      activeInteractions.push(event);
    }
  }

  return activeInteractions;
}

module.exports = updateActiveInteractions;