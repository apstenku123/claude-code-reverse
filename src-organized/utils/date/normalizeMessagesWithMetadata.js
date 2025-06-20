/**
 * Normalizes an array of message objects by ensuring each message
 * (of type 'assistant' or 'user') includes a uuid and timestamp.
 * Ignores any messages of other types.
 *
 * @param {Array<Object>} messages - The array of message objects to normalize.
 * @returns {Array<Object>} a new array of normalized message objects, each with type, message, uuid, and timestamp.
 */
function normalizeMessagesWithMetadata(messages) {
  return messages.flatMap((message) => {
    switch (message.type) {
      case "assistant":
        // Add uuid and timestamp to assistant messages
        return [{
          type: "assistant",
          message: message.message,
          uuid: m_2(),
          timestamp: new Date().toISOString()
        }];
      case "user":
        // Add uuid and timestamp to user messages
        return [{
          type: "user",
          message: message.message,
          uuid: m_2(),
          timestamp: new Date().toISOString()
        }];
      default:
        // Ignore messages of unknown type
        return [];
    }
  });
}

module.exports = normalizeMessagesWithMetadata;