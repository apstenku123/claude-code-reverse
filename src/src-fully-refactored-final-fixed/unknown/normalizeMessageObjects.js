/**
 * Normalizes an array of message objects by ensuring each message (of type 'assistant' or 'user')
 * is returned with a new UUID and timestamp. Messages of other types are ignored.
 *
 * @param {Array<{type: string, message: string}>} messages - The array of message objects to normalize.
 * @returns {Array<{type: string, message: string, uuid: string, timestamp: string}>} The normalized array of message objects.
 */
function normalizeMessageObjects(messages) {
  return messages.flatMap((messageObject) => {
    switch (messageObject.type) {
      case "assistant":
      case "user":
        // For 'assistant' and 'user' types, return a new object with uuid and timestamp
        return [{
          type: messageObject.type,
          message: messageObject.message,
          uuid: m_2(), // Generate a new unique identifier
          timestamp: new Date().toISOString() // Current timestamp in ISO format
        }];
      default:
        // Ignore any other message types
        return [];
    }
  });
}

module.exports = normalizeMessageObjects;