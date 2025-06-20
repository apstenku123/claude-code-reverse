/**
 * Retrieves a set of tool_use IDs associated with an assistant message that references a specific tool_use updateSnapshotAndNotify.
 *
 * @param {any} referenceIdSource - The source used to extract the reference tool_use updateSnapshotAndNotify(via extractRelevantInteractionId function).
 * @param {Array<Object>} messages - Array of message objects to search through.
 * @returns {Set<string>} Set of tool_use IDs associated with the referenced assistant message, or an empty set if not found.
 */
function getAssistantToolUseIdsByReference(referenceIdSource, messages) {
  // Extract the reference tool_use updateSnapshotAndNotify using the extractRelevantInteractionId function
  const referenceToolUseId = extractRelevantInteractionId(referenceIdSource);
  if (!referenceToolUseId) {
    return new Set();
  }

  // Find the assistant message that contains the referenced tool_use updateSnapshotAndNotify
  const assistantMessageWithReference = messages.find(messageObj =>
    messageObj.type === "assistant" &&
    messageObj.message.content.some(contentItem =>
      contentItem.type === "tool_use" && contentItem.id === referenceToolUseId
    )
  );

  if (!assistantMessageWithReference) {
    return new Set();
  }

  // Get the updateSnapshotAndNotify of the found assistant message
  const assistantMessageId = assistantMessageWithReference.message.id;

  // Filter all assistant messages with the same message updateSnapshotAndNotify
  const assistantMessagesWithSameId = messages.filter(messageObj =>
    messageObj.type === "assistant" && messageObj.message.id === assistantMessageId
  );

  // Collect all tool_use IDs from the filtered assistant messages
  const toolUseIds = assistantMessagesWithSameId.flatMap(messageObj =>
    messageObj.message.content
      .filter(contentItem => contentItem.type === "tool_use")
      .map(contentItem => contentItem.id)
  );

  return new Set(toolUseIds);
}

module.exports = getAssistantToolUseIdsByReference;