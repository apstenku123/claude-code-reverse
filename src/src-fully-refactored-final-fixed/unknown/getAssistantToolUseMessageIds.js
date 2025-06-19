/**
 * Extracts unique IDs of assistant messages that use tools and are validated by the provided configuration.
 *
 * @param {Array<Object>} messages - An array of message objects to process.
 * @returns {Set<string>} a set of unique tool_use message IDs from assistant messages that are validated by the configuration.
 */
function getAssistantToolUseMessageIds(messages) {
  // Retrieve the configuration object based on the messages array
  const config = wz2(messages);

  // Filter messages to find assistant messages with a valid tool_use content and validated by config
  const validToolUseIds = messages
    .filter(message =>
      message.type === "assistant" &&
      Array.isArray(message.message.content) &&
      message.message.content[0]?.type === "tool_use" &&
      message.message.content[0]?.id in config &&
      config[message.message.content[0]?.id] === true
    )
    .map(message => message.message.content[0].id);

  // Return a set of unique tool_use IDs
  return new Set(validToolUseIds);
}

module.exports = getAssistantToolUseMessageIds;