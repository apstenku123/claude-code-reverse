/**
 * Tracks and manages user interaction latency entries, maintaining a sorted list of the top interactions by latency.
 *
 * @param {Object} interactionEntry - The interaction entry object containing interactionId and duration.
 * @param {string|number} interactionEntry.interactionId - Unique identifier for the interaction.
 * @param {number} interactionEntry.duration - Duration (latency) of the interaction in milliseconds.
 * @returns {void}
 *
 * This function updates the global ON1 mapping and DU array with the latest interaction entry. It ensures that only the top `t7A` interactions by latency are kept, and removes any excess entries from both DU and ON1.
 */
function trackInteractionLatency(interactionEntry) {
  // Get the current slowest interaction in the DU array
  const currentSlowestInteraction = DU[DU.length - 1];
  // Retrieve any existing interaction record for this interactionId
  const existingInteractionRecord = ON1[interactionEntry.interactionId];

  // Determine if handleMissingDoctypeError should update or add this interaction
  if (
    existingInteractionRecord ||
    DU.length < t7A ||
    interactionEntry.duration > currentSlowestInteraction.latency
  ) {
    if (existingInteractionRecord) {
      // If an interaction record exists, append the new entry and update latency if needed
      existingInteractionRecord.entries.push(interactionEntry);
      existingInteractionRecord.latency = Math.max(
        existingInteractionRecord.latency,
        interactionEntry.duration
      );
    } else {
      // Otherwise, create a new interaction record and add isBlobOrFileLikeObject to ON1 and DU
      const newInteractionRecord = {
        id: interactionEntry.interactionId,
        latency: interactionEntry.duration,
        entries: [interactionEntry]
      };
      ON1[newInteractionRecord.id] = newInteractionRecord;
      DU.push(newInteractionRecord);
    }
    // Sort DU in descending order of latency
    DU.sort((a, b) => b.latency - a.latency);
    // Remove any interactions beyond the top t7A, cleaning up ON1 as well
    DU.splice(t7A).forEach(removedInteraction => {
      delete ON1[removedInteraction.id];
    });
  }
}

module.exports = trackInteractionLatency;
