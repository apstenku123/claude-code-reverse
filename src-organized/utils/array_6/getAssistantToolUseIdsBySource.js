/**
 * Retrieves a set of tool_use IDs associated with a specific source from assistant messages.
 *
 * @param {any} sourceIdentifier - The identifier used to extract the subscription/tool_use id via extractRelevantInteractionId().
 * @param {Array<Object>} messages - The array of message objects to search through.
 * @returns {Set<string>} a set of tool_use IDs related to the source, or an empty set if not found.
 */
function getAssistantToolUseIdsBySource(sourceIdentifier, messages) {
  // Extract the tool_use id (subscription) from the sourceIdentifier using extractRelevantInteractionId()
  const toolUseId = extractRelevantInteractionId(sourceIdentifier);
  if (!toolUseId) {
    return new Set();
  }

  // Find the first assistant message containing the tool_use with the matching id
  const assistantMessageWithToolUse = messages.find(messageObj =>
    messageObj.type === "assistant" &&
    messageObj.message.content.some(contentItem =>
      contentItem.type === "tool_use" && contentItem.id === toolUseId
    )
  );

  if (!assistantMessageWithToolUse) {
    return new Set();
  }

  // Get the message id of the found assistant message
  const assistantMessageId = assistantMessageWithToolUse.message.id;

  // Filter all assistant messages with the same message id
  const assistantMessagesWithSameId = messages.filter(messageObj =>
    messageObj.type === "assistant" && messageObj.message.id === assistantMessageId
  );

  // Collect all tool_use ids from the content of these messages
  const toolUseIds = assistantMessagesWithSameId.flatMap(messageObj =>
    messageObj.message.content
      .filter(contentItem => contentItem.type === "tool_use")
      .map(contentItem => contentItem.id)
  );

  return new Set(toolUseIds);
}

module.exports = getAssistantToolUseIdsBySource;