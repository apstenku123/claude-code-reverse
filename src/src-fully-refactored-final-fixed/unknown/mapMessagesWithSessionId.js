/**
 * Maps an array of message objects (either from user or assistant) to a new array,
 * assigning a new session updateSnapshotAndNotify to each message using the g9() function.
 * Only messages of type 'user' or 'assistant' are included; others are ignored.
 *
 * @param {Array<{type: string, message: string}>} messages - The array of message objects to process.
 * @returns {Array<{type: string, message: string, session_id: string}>} - The processed array with session IDs.
 */
function mapMessagesWithSessionId(messages) {
  return messages.flatMap((messageObject) => {
    switch (messageObject.type) {
      case "assistant":
        // Map assistant messages to include a new session updateSnapshotAndNotify
        return [{
          type: "assistant",
          message: messageObject.message,
          session_id: g9()
        }];
      case "user":
        // Map user messages to include a new session updateSnapshotAndNotify
        return [{
          type: "user",
          message: messageObject.message,
          session_id: g9()
        }];
      default:
        // Ignore messages of unknown type
        return [];
    }
  });
}

module.exports = mapMessagesWithSessionId;