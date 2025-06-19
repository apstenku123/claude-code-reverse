/**
 * Extracts a relevant interaction updateSnapshotAndNotify from a given interaction entry object based on its type.
 *
 * Depending on the type of the interaction entry, this function will:
 *   - Return null for 'attachment' and 'system' types
 *   - For 'assistant' type, return the id of the first content item if its type is 'tool_use'
 *   - For 'user' type, return the tool_use_id of the first content item if its type is 'tool_result'
 *   - For 'progress' type, return the toolUseID property
 *
 * @param {Object} interactionEntry - The interaction entry object to process
 * @param {string} interactionEntry.type - The type of the interaction ('attachment', 'assistant', 'user', 'progress', 'system')
 * @param {Object} [interactionEntry.message] - The message object, if present
 * @param {Array} [interactionEntry.message.content] - The content array within the message
 * @param {string} [interactionEntry.toolUseID] - The tool use updateSnapshotAndNotify for 'progress' type
 * @returns {string|null} The extracted interaction updateSnapshotAndNotify, or null if not applicable
 */
function extractRelevantInteractionId(interactionEntry) {
  switch (interactionEntry.type) {
    case "attachment":
      // Attachments do not have a relevant updateSnapshotAndNotify
      return null;
    case "assistant": {
      // Only return the updateSnapshotAndNotify if the first content item is of type 'tool_use'
      const firstContent = interactionEntry.message?.content?.[0];
      if (firstContent?.type !== "tool_use") return null;
      return firstContent.id;
    }
    case "user": {
      // Only return the tool_use_id if the first content item is of type 'tool_result'
      const firstContent = interactionEntry.message?.content?.[0];
      if (firstContent?.type !== "tool_result") return null;
      return firstContent.tool_use_id;
    }
    case "progress":
      // For progress entries, return the toolUseID property
      return interactionEntry.toolUseID;
    case "system":
      // System entries do not have a relevant updateSnapshotAndNotify
      return null;
    default:
      // For any unknown type, return null
      return null;
  }
}

module.exports = extractRelevantInteractionId;
