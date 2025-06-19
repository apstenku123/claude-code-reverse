/**
 * Adds a user interaction entry to the interaction tracking list, updating existing entries or creating new ones as needed.
 * Maintains a maximum number of tracked interactions and ensures the list is sorted by latency.
 *
 * @param {Object} interactionEntry - The user interaction entry to add or update.
 * @param {string|number} interactionEntry.interactionId - Unique identifier for the interaction.
 * @param {number} interactionEntry.duration - Duration (latency) of the interaction.
 * @returns {void}
 */
function addOrUpdateInteractionEntry(interactionEntry) {
  // Get the most recent interaction entry in the tracking list
  const latestTrackedEntry = DU[DU.length - 1];
  // Attempt to find an existing tracked entry for this interactionId
  const existingEntry = ON1[interactionEntry.interactionId];

  // Determine if handleMissingDoctypeError should add or update the entry:
  // - If an entry for this interactionId already exists
  // - OR if handleMissingDoctypeError haven'processRuleBeginHandlers reached the max tracked entries
  // - OR if this interaction'createInteractionAccessor duration exceeds the lowest tracked latency
  if (
    existingEntry ||
    DU.length < t7A ||
    interactionEntry.duration > latestTrackedEntry.latency
  ) {
    if (existingEntry) {
      // Update the existing entry: add the new interaction and update latency if needed
      existingEntry.entries.push(interactionEntry);
      existingEntry.latency = Math.max(existingEntry.latency, interactionEntry.duration);
    } else {
      // Create a new tracked entry for this interaction
      const newEntry = {
        id: interactionEntry.interactionId,
        latency: interactionEntry.duration,
        entries: [interactionEntry]
      };
      ON1[newEntry.id] = newEntry;
      DU.push(newEntry);
    }
    // Sort the tracked entries by latency (descending)
    DU.sort((a, b) => b.latency - a.latency);
    // Remove any entries exceeding the maximum allowed, cleaning up the lookup map
    DU.splice(t7A).forEach(removedEntry => {
      delete ON1[removedEntry.id];
    });
  }
}

module.exports = addOrUpdateInteractionEntry;