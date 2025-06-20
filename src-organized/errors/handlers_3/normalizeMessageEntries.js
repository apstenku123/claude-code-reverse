/**
 * Normalizes an array of message entries by flattening and transforming them into a consistent structure.
 * Handles different message types (assistant, user, attachment, progress, system),
 * splits multi-part contents into separate entries, and assigns new UUIDs when needed.
 *
 * @param {Array<Object>} messageEntries - The array of message entry objects to normalize.
 * @returns {Array<Object>} a flattened and normalized array of message entry objects.
 */
function normalizeMessageEntries(messageEntries) {
  let hasMultipleContents = false;

  return messageEntries.flatMap((entry) => {
    switch (entry.type) {
      case "assistant": {
        // If any assistant message has multiple contents, set the flag
        hasMultipleContents = hasMultipleContents || entry.message.content.length > 1;
        return entry.message.content.map((contentItem) => {
          // Assign a new UUID if there are multiple contents, otherwise keep the original
          const uuid = hasMultipleContents ? NO() : entry.uuid;
          return {
            type: "assistant",
            timestamp: new Date().toISOString(),
            message: {
              ...entry.message,
              content: [contentItem]
            },
            isMeta: entry.isMeta,
            requestId: entry.requestId,
            uuid
          };
        });
      }
      case "attachment":
      case "progress":
      case "system": {
        // Pass these types through unchanged
        return [entry];
      }
      case "user": {
        if (typeof entry.message.content === "string") {
          // If user message content is a string, wrap isBlobOrFileLikeObject in an object
          const uuid = hasMultipleContents ? NO() : entry.uuid;
          return [{
            ...entry,
            uuid,
            message: {
              ...entry.message,
              content: [{
                type: "text",
                text: entry.message.content
              }]
            }
          }];
        }
        // If user message content is an array, handle multiple contents
        hasMultipleContents = hasMultipleContents || entry.message.content.length > 1;
        return entry.message.content.map((contentItem) => ({
          ...createUserMessageObject({
            content: [contentItem],
            toolUseResult: entry.toolUseResult,
            isMeta: entry.isMeta
          }),
          uuid: hasMultipleContents ? NO() : entry.uuid
        }));
      }
      default:
        // Unknown type: skip
        return [];
    }
  });
}

module.exports = normalizeMessageEntries;