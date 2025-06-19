/**
 * Merges two arrays of message objects, ensuring that tool result messages are inserted immediately after their corresponding tool use messages.
 *
 * @param {Array<Object>} primaryMessages - The main array of message objects to process and order.
 * @param {Array<Object>} additionalMessages - Additional message objects to append after processing the primary array.
 * @returns {Array<Object>} The merged and ordered array of message objects.
 */
function mergeAndOrderMessages(primaryMessages, additionalMessages) {
  const orderedMessages = [];
  const toolUseMessages = [];

  for (const message of primaryMessages) {
    // Collect tool use messages for later reference
    if (hasAssistantToolUseMessage(message)) {
      toolUseMessages.push(message);
    }

    // Check if the message is a user message containing a tool result
    if (
      message.type === "user" &&
      Array.isArray(message.message.content) &&
      message.message.content[0]?.type === "tool_result"
    ) {
      const toolUseId = message.message.content[0]?.tool_use_id;
      // Find the corresponding tool use message by updateSnapshotAndNotify
      const correspondingToolUseMessage = toolUseMessages.find(
        (toolUseMsg) => toolUseMsg.message.content[0]?.id === toolUseId
      );
      if (correspondingToolUseMessage) {
        // Insert the tool result message immediately after its tool use message
        const insertIndex = orderedMessages.indexOf(correspondingToolUseMessage) + 1;
        orderedMessages.splice(insertIndex, 0, message);
        continue;
      }
    }
    // Otherwise, add the message to the ordered list
    orderedMessages.push(message);
  }

  // Append all additional messages at the end
  for (const message of additionalMessages) {
    orderedMessages.push(message);
  }

  return orderedMessages;
}

module.exports = mergeAndOrderMessages;