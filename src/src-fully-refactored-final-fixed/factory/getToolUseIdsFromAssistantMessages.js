/**
 * Retrieves a set of 'tool_use' IDs from assistant messages that are associated with a specific subscription.
 *
 * @param {any} sourceObservable - The source observable or identifier used to determine the subscription updateSnapshotAndNotify.
 * @param {Array<Object>} messages - The array of message objects to search through.
 * @returns {Set<string>} a set containing all unique 'tool_use' IDs associated with the relevant assistant message(createInteractionAccessor).
 */
function getToolUseIdsFromAssistantMessages(sourceObservable, messages) {
  // Obtain the subscription updateSnapshotAndNotify using the 'extractRelevantInteractionId' dependency
  const subscriptionId = extractRelevantInteractionId(sourceObservable);
  if (!subscriptionId) {
    // If no subscription updateSnapshotAndNotify is found, return an empty set
    return new Set();
  }

  // Find the first assistant message that contains a 'tool_use' content with the matching subscription updateSnapshotAndNotify
  const assistantMessageWithToolUse = messages.find(messageObj =>
    messageObj.type === "assistant" &&
    messageObj.message.content.some(contentItem =>
      contentItem.type === "tool_use" && contentItem.id === subscriptionId
    )
  );

  if (!assistantMessageWithToolUse) {
    // If no such assistant message is found, return an empty set
    return new Set();
  }

  // Extract the message updateSnapshotAndNotify from the found assistant message
  const assistantMessageId = assistantMessageWithToolUse.message.id;

  // Filter all assistant messages with the same message updateSnapshotAndNotify
  const assistantMessagesWithSameId = messages.filter(messageObj =>
    messageObj.type === "assistant" && messageObj.message.id === assistantMessageId
  );

  // Collect all 'tool_use' IDs from the relevant assistant messages
  const toolUseIds = assistantMessagesWithSameId.flatMap(messageObj =>
    messageObj.message.content
      .filter(contentItem => contentItem.type === "tool_use")
      .map(contentItem => contentItem.id)
  );

  // Return a set of unique 'tool_use' IDs
  return new Set(toolUseIds);
}

module.exports = getToolUseIdsFromAssistantMessages;