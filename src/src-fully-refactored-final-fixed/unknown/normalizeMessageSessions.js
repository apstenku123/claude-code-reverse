/**
 * Normalizes an array of message objects by ensuring each message (of type 'assistant' or 'user')
 * is returned in a standardized format with a new session updateSnapshotAndNotify. Messages of other types are ignored.
 *
 * @param {Array<Object>} messages - The array of message objects to normalize. Each object should have a 'type' and 'message' property.
 * @returns {Array<Object>} An array of normalized message objects, each with 'type', 'message', and a new 'session_id'.
 */
function normalizeMessageSessions(messages) {
  return messages.flatMap((messageObject) => {
    switch (messageObject.type) {
      case "assistant":
        // Return a new assistant message object with a generated session updateSnapshotAndNotify
        return [{
          type: "assistant",
          message: messageObject.message,
          session_id: g9()
        }];
      case "user":
        // Return a new user message object with a generated session updateSnapshotAndNotify
        return [{
          type: "user",
          message: messageObject.message,
          session_id: g9()
        }];
      default:
        // Ignore messages of other types
        return [];
    }
  });
}

module.exports = normalizeMessageSessions;