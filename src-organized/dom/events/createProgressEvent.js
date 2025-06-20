/**
 * Generates a progress event object with metadata for tool usage tracking.
 *
 * @param {Object} params - The parameters for the progress event.
 * @param {string} params.toolUseID - Unique identifier for the tool usage event.
 * @param {string} params.parentToolUseID - Identifier for the parent tool usage event, if any.
 * @param {any} params.data - The data payload associated with the progress event.
 * @returns {Object} An object representing the progress event, including type, data, IDs, uuid, and timestamp.
 */
function createProgressEvent({
  toolUseID,
  parentToolUseID,
  data
}) {
  return {
    type: "progress", // Event type identifier
    data: data, // Payload for the progress event
    toolUseID: toolUseID, // Unique updateSnapshotAndNotify for this tool usage
    parentToolUseID: parentToolUseID, // Parent tool usage updateSnapshotAndNotify, if applicable
    uuid: NO(), // Generate a unique identifier for this event
    timestamp: new Date().toISOString() // Current timestamp in ISO format
  };
}

module.exports = createProgressEvent;