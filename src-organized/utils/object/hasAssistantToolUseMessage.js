/**
 * Checks if the given message object is from an assistant and contains at least one tool use message.
 *
 * @param {Object} messageObject - The message object to check.
 * @param {string} messageObject.type - The type of the message sender (e.g., 'assistant').
 * @param {Object} messageObject.message - The message details.
 * @param {Array} messageObject.message.content - Array of message content entries.
 * @returns {boolean} True if the message is from an assistant and contains a tool use entry; otherwise, false.
 */
function hasAssistantToolUseMessage(messageObject) {
  // Check if the message is from an assistant
  const isFromAssistant = messageObject.type === "assistant";

  // Check if the message content contains at least one entry of type 'tool_use'
  const containsToolUse = Array.isArray(messageObject.message?.content) &&
    messageObject.message.content.some(
      (contentEntry) => contentEntry.type === "tool_use"
    );

  return isFromAssistant && containsToolUse;
}

module.exports = hasAssistantToolUseMessage;