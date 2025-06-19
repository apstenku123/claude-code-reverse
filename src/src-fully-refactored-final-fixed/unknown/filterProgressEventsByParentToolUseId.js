/**
 * Filters an array of event objects, returning only those of type 'progress' whose parentToolUseID matches the relevant interaction updateSnapshotAndNotify extracted from the given interaction entry.
 *
 * @param {Object} interactionEntry - The interaction entry object from which to extract the relevant interaction or tool-use updateSnapshotAndNotify.
 * @param {Array<Object>} events - An array of event objects to be filtered.
 * @returns {Array<Object>} An array of filtered event objects of type 'progress' with matching parentToolUseID.
 */
function filterProgressEventsByParentToolUseId(interactionEntry, events) {
  // Extract the relevant interaction or tool-use updateSnapshotAndNotify from the interaction entry
  const relevantInteractionId = extractRelevantInteractionId(interactionEntry);
  
  // If no relevant interaction updateSnapshotAndNotify is found, return an empty array
  if (!relevantInteractionId) {
    return [];
  }

  // Filter events to include only those of type 'progress' and with matching parentToolUseID
  return events.filter(event =>
    event.type === "progress" && event.parentToolUseID === relevantInteractionId
  );
}

module.exports = filterProgressEventsByParentToolUseId;