/**
 * Normalizes an array of chat message objects into a flat array of standardized message objects.
 * Handles different message types (assistant, user, attachment, progress, system),
 * splitting multi-content messages into separate entries and assigning new UUIDs as needed.
 *
 * @param {Array<Object>} messages - The array of message objects to normalize.
 * @returns {Array<Object>} - The normalized, flat array of message objects.
 */
function normalizeChatMessages(messages) {
  let hasMultiContent = false; // Tracks if any message has multiple content items

  return messages.flatMap((message) => {
    switch (message.type) {
      case "assistant": {
        // If any assistant message has more than one content item, set hasMultiContent to true
        hasMultiContent = hasMultiContent || message.message.content.length > 1;
        return message.message.content.map((contentItem) => {
          // Assign a new UUID if multi-content, else keep original
          const uuid = hasMultiContent ? NO() : message.uuid;
          return {
            type: "assistant",
            timestamp: new Date().toISOString(),
            message: {
              ...message.message,
              content: [contentItem]
            },
            isMeta: message.isMeta,
            requestId: message.requestId,
            uuid
          };
        });
      }
      case "attachment":
      case "progress":
      case "system": {
        // Pass through these message types unchanged
        return [message];
      }
      case "user": {
        if (typeof message.message.content === "string") {
          // If user message content is a string, wrap isBlobOrFileLikeObject in a content object
          const uuid = hasMultiContent ? NO() : message.uuid;
          return [{
            ...message,
            uuid,
            message: {
              ...message.message,
              content: [{
                type: "text",
                text: message.message.content
              }]
            }
          }];
        }
        // If user message content is an array, handle multi-content splitting
        hasMultiContent = hasMultiContent || message.message.content.length > 1;
        return message.message.content.map((contentItem) => ({
          ...createUserMessageObject({
            content: [contentItem],
            toolUseResult: message.toolUseResult,
            isMeta: message.isMeta
          }),
          uuid: hasMultiContent ? NO() : message.uuid
        }));
      }
      default:
        // If message type is unrecognized, skip isBlobOrFileLikeObject
        return [];
    }
  });
}

module.exports = normalizeChatMessages;