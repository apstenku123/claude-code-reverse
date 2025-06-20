/**
 * Normalizes an array of message objects by splitting multi-content messages into individual messages,
 * assigning new UUIDs when necessary, and preserving message metadata. Handles different message types
 * including assistant, user, attachment, progress, and system.
 *
 * @param {Array<Object>} messages - The array of message objects to normalize.
 * @returns {Array<Object>} The normalized array of message objects.
 */
function normalizeMessageArray(messages) {
  let hasMultipleContents = false;

  return messages.flatMap(message => {
    switch (message.type) {
      case "assistant": {
        // Check if any assistant message has multiple contents
        hasMultipleContents = hasMultipleContents || message.message.content.length > 1;
        return message.message.content.map(contentItem => {
          // Assign a new UUID if any message has multiple contents
          const uuid = hasMultipleContents ? NO() : message.uuid;
          return {
            type: "assistant",
            timestamp: new Date().toISOString(),
            message: {
              ...message.message,
              content: [contentItem]
            },
            isMeta: message.isMeta,
            requestId: message.requestId,
            uuid: uuid
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
        // If user message content is a string, wrap isBlobOrFileLikeObject in an object
        if (typeof message.message.content === "string") {
          const uuid = hasMultipleContents ? NO() : message.uuid;
          return [{
            ...message,
            uuid: uuid,
            message: {
              ...message.message,
              content: [{
                type: "text",
                text: message.message.content
              }]
            }
          }];
        }
        // If user message content is an array, split into individual messages
        hasMultipleContents = hasMultipleContents || message.message.content.length > 1;
        return message.message.content.map(contentItem => ({
          ...createUserMessageObject({
            content: [contentItem],
            toolUseResult: message.toolUseResult,
            isMeta: message.isMeta
          }),
          uuid: hasMultipleContents ? NO() : message.uuid
        }));
      }
      default:
        // For unknown types, return the message as-is
        return [message];
    }
  });
}

module.exports = normalizeMessageArray;