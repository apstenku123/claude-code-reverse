/**
 * Retrieves a set of tool_use IDs associated with a specific assistant message, identified by a subscription value derived from the sourceObservable.
 *
 * @param {any} sourceObservable - The source input used to derive the subscription updateSnapshotAndNotify via extractRelevantInteractionId().
 * @param {Array<Object>} messages - The array of message objects to search through.
 * @returns {Set<string>} a set of tool_use IDs associated with the matching assistant message, or an empty set if not found.
 */
function getAssistantToolUseIdsByObservable(sourceObservable, messages) {
  // Derive the subscription updateSnapshotAndNotify from the sourceObservable using the extractRelevantInteractionId() function
  const subscriptionId = extractRelevantInteractionId(sourceObservable);
  if (!subscriptionId) {
    // If no subscription updateSnapshotAndNotify is found, return an empty set
    return new Set();
  }

  // Find the first assistant message that contains a tool_use with the matching subscription updateSnapshotAndNotify
  const assistantMessage = messages.find(
    (messageObj) =>
      messageObj.type === "assistant" &&
      messageObj.message.content.some(
        (contentItem) =>
          contentItem.type === "tool_use" && contentItem.id === subscriptionId
      )
  );

  if (!assistantMessage) {
    // If no matching assistant message is found, return an empty set
    return new Set();
  }

  // Extract the message updateSnapshotAndNotify of the found assistant message
  const assistantMessageId = assistantMessage.message.id;

  // Filter all assistant messages with the same message updateSnapshotAndNotify
  const matchingAssistantMessages = messages.filter(
    (messageObj) =>
      messageObj.type === "assistant" && messageObj.message.id === assistantMessageId
  );

  // Collect all tool_use IDs from the matching assistant messages
  const toolUseIds = matchingAssistantMessages.flatMap((messageObj) =>
    messageObj.message.content
      .filter((contentItem) => contentItem.type === "tool_use")
      .map((contentItem) => contentItem.id)
  );

  // Return a set of unique tool_use IDs
  return new Set(toolUseIds);
}

module.exports = getAssistantToolUseIdsByObservable;