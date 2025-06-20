/**
 * Filters out assistant messages that use a tool and are present in the provided set of IDs.
 *
 * This function normalizes the input message array, then removes any assistant messages whose first content item is of type 'tool_use' and whose updateSnapshotAndNotify is present in the provided set (as determined by the MO function).
 *
 * @param {Array<Object>} messages - The array of message objects to filter.
 * @returns {Array<Object>} The filtered array of message objects.
 */
function filterAssistantMessages(messages) {
  // Normalize the input messages array (splits multi-content messages, assigns UUIDs, etc.)
  const normalizedMessages = normalizeMessageArray(messages);

  // Get a set of IDs (or similar structure) from the normalized messages using MO
  const toolUseIdSet = MO(normalizedMessages);

  // Filter out assistant messages that use a tool and whose updateSnapshotAndNotify is in the set
  return normalizedMessages.filter((message) => {
    // Check if message is from assistant and its first content is a tool_use type
    const isAssistant = message.type === "assistant";
    const firstContent = message.message.content[0];
    const isToolUse = firstContent?.type === "tool_use";
    const isIdInSet = isToolUse && toolUseIdSet.has(firstContent.id);

    // Exclude this message if all conditions are met
    if (isAssistant && isToolUse && isIdInSet) {
      return false;
    }
    return true;
  });
}

module.exports = filterAssistantMessages;