/**
 * Retrieves a set of tool_use IDs associated with a specific assistant message subscription.
 *
 * @param {any} sourceObservable - The source object used to derive the subscription updateSnapshotAndNotify(passed to extractRelevantInteractionId).
 * @param {Array<Object>} messages - An array of message objects to search through.
 * @returns {Set<string>} a set of tool_use IDs associated with the assistant message matching the subscription.
 */
function getAssistantToolUseIdsBySubscription(sourceObservable, messages) {
  // Get the subscription updateSnapshotAndNotify using the external 'extractRelevantInteractionId' function
  const subscriptionId = extractRelevantInteractionId(sourceObservable);
  if (!subscriptionId) {
    // If no subscription updateSnapshotAndNotify is found, return an empty set
    return new Set();
  }

  // Find the first assistant message whose content includes a tool_use with the matching subscription updateSnapshotAndNotify
  const assistantMessageWithSubscription = messages.find(messageObj =>
    messageObj.type === "assistant" &&
    messageObj.message.content.some(contentItem =>
      contentItem.type === "tool_use" && contentItem.id === subscriptionId
    )
  );

  if (!assistantMessageWithSubscription) {
    // If no such assistant message is found, return an empty set
    return new Set();
  }

  // Extract the message updateSnapshotAndNotify of the found assistant message
  const targetMessageId = assistantMessageWithSubscription.message.id;

  // Filter all assistant messages with the same message updateSnapshotAndNotify
  const assistantMessagesWithSameId = messages.filter(messageObj =>
    messageObj.type === "assistant" && messageObj.message.id === targetMessageId
  );

  // Collect all tool_use IDs from the filtered messages
  const toolUseIds = assistantMessagesWithSameId.flatMap(messageObj =>
    messageObj.message.content
      .filter(contentItem => contentItem.type === "tool_use")
      .map(contentItem => contentItem.id)
  );

  // Return a set of unique tool_use IDs
  return new Set(toolUseIds);
}

module.exports = getAssistantToolUseIdsBySubscription;