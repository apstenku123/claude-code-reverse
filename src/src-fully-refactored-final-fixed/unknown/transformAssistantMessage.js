/**
 * Transforms an assistant message object by applying a transformation function to its content entries.
 * Handles different content types ('text', 'tool_use', etc.) and applies the appropriate transformation.
 *
 * @param {Object} assistantMessageData - The original assistant message data, containing timestamp and message.
 * @param {Function} transformText - Function to transform text content (e.g., for formatting or localization).
 * @returns {Object} The transformed assistant message object with updated content.
 */
function transformAssistantMessage(assistantMessageData, transformText) {
  return {
    uuid: "UUID", // Static UUID placeholder
    requestId: "REQUEST_ID", // Static request updateSnapshotAndNotify placeholder
    timestamp: assistantMessageData.timestamp, // Preserve original timestamp
    message: {
      // Spread original message properties
      ...assistantMessageData.message,
      // Transform each content entry in the message
      content: assistantMessageData.message.content
        .map(contentEntry => {
          switch (contentEntry.type) {
            case "text":
              // For text entries, transform the text and ensure citations array exists
              return {
                ...contentEntry,
                text: transformText(contentEntry.text),
                citations: contentEntry.citations || []
              };
            case "tool_use":
              // For tool_use entries, transform the input using mapObservableDeep
              return {
                ...contentEntry,
                input: mapObservableDeep(contentEntry.input, transformText)
              };
            default:
              // For other types, return as-is
              return contentEntry;
          }
        })
        // Filter out any falsy values from the content array
        .filter(Boolean)
    },
    type: "assistant" // Set the message type
  };
}

module.exports = transformAssistantMessage;
