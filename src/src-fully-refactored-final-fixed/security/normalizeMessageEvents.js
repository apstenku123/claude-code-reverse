/**
 * Normalizes an array of message event objects into a flat array of standardized message objects.
 * Handles different message types (assistant, user, attachment, progress, system),
 * splitting multi-content messages into individual message objects and assigning new UUIDs when needed.
 *
 * @param {Array<Object>} messageEvents - The array of message event objects to normalize.
 * @returns {Array<Object>} a flat array of normalized message objects.
 */
function normalizeMessageEvents(messageEvents) {
  let hasMultipleContents = false;

  return messageEvents.flatMap(event => {
    switch (event.type) {
      case "assistant": {
        // If any assistant message has multiple contents, set the flag
        hasMultipleContents = hasMultipleContents || event.message.content.length > 1;
        return event.message.content.map(contentItem => {
          // Assign a new UUID if there are multiple contents, otherwise keep the original
          const uuid = hasMultipleContents ? NO() : event.uuid;
          return {
            type: "assistant",
            timestamp: new Date().toISOString(),
            message: {
              ...event.message,
              content: [contentItem]
            },
            isMeta: event.isMeta,
            requestId: event.requestId,
            uuid: uuid
          };
        });
      }
      case "attachment":
      case "progress":
      case "system": {
        // Pass through these types unchanged
        return [event];
      }
      case "user": {
        if (typeof event.message.content === "string") {
          // If user message content is a string, wrap isBlobOrFileLikeObject in a text content object
          const uuid = hasMultipleContents ? NO() : event.uuid;
          return [{
            ...event,
            uuid: uuid,
            message: {
              ...event.message,
              content: [{
                type: "text",
                text: event.message.content
              }]
            }
          }];
        }
        // If user message content is an array, split into individual messages
        hasMultipleContents = hasMultipleContents || event.message.content.length > 1;
        return event.message.content.map(contentItem => ({
          ...createUserMessageObject({
            content: [contentItem],
            toolUseResult: event.toolUseResult,
            isMeta: event.isMeta
          }),
          uuid: hasMultipleContents ? NO() : event.uuid
        }));
      }
      default:
        // Unknown type: ignore
        return [];
    }
  });
}

module.exports = normalizeMessageEvents;