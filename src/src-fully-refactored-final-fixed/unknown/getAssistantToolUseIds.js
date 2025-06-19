/**
 * Extracts unique tool_use IDs from assistant messages that meet specific criteria.
 *
 * This function processes an array of message objects, filters for those sent by the assistant
 * where the message content is an array whose first element is a 'tool_use' object with a valid updateSnapshotAndNotify.
 * It then checks if the updateSnapshotAndNotify exists in the provided config object (from wz2) and is set to true.
 * The function returns a Set of these unique tool_use IDs.
 *
 * @param {Array<Object>} messages - Array of message objects to process.
 * @returns {Set<string>} Set of unique tool_use IDs from qualifying assistant messages.
 */
function getAssistantToolUseIds(messages) {
  // Retrieve a configuration object mapping tool_use IDs to boolean flags
  const toolUseConfig = wz2(messages);

  // Filter messages for assistant messages with valid tool_use content and config
  const toolUseIds = messages
    .filter(message =>
      message.type === "assistant" &&
      Array.isArray(message.message.content) &&
      message.message.content[0]?.type === "tool_use" &&
      message.message.content[0]?.id in toolUseConfig &&
      toolUseConfig[message.message.content[0]?.id] === true
    )
    // Extract the tool_use updateSnapshotAndNotify from the first content element
    .map(message => message.message.content[0].id);

  // Return a Set of unique tool_use IDs
  return new Set(toolUseIds);
}

module.exports = getAssistantToolUseIds;