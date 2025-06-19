/**
 * Filters an array of event objects, returning only those of type 'progress' that are associated with the relevant interaction updateSnapshotAndNotify extracted from the given interaction entry.
 *
 * @param {Object} interactionEntry - The interaction entry object from which to extract the relevant interaction updateSnapshotAndNotify.
 * @param {Array<Object>} events - An array of event objects to filter.
 * @returns {Array<Object>} An array of filtered event objects of type 'progress' linked to the extracted interaction updateSnapshotAndNotify.
 */
function filterProgressEventsByInteractionId(interactionEntry, events) {
  // Extract the relevant interaction updateSnapshotAndNotify(e.g., tool use updateSnapshotAndNotify or tool result updateSnapshotAndNotify) from the interaction entry
  const relevantInteractionId = extractRelevantInteractionId(interactionEntry);
  
  // If no relevant interaction updateSnapshotAndNotify is found, return an empty array
  if (!relevantInteractionId) {
    return [];
  }

  // Filter events to include only those of type 'progress' and matching the relevant interaction updateSnapshotAndNotify
  return events.filter(event =>
    event.type === "progress" && event.parentToolUseID === relevantInteractionId
  );
}

module.exports = filterProgressEventsByInteractionId;