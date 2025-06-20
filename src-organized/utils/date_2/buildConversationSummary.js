/**
 * Builds a summary object for a conversation based on an array of message entries.
 *
 * @param {Array<Object>} messageEntries - Array of message objects, each containing at least 'timestamp', 'uuid', and 'isSidechain' properties.
 * @param {number} [value=0] - Optional numeric value to include in the summary (default is 0).
 * @returns {Object} Summary object containing conversation metadata and statistics.
 */
function buildConversationSummary(messageEntries, value = 0) {
  // The last message in the conversation
  const lastMessage = messageEntries[messageEntries.length - 1];
  // The first message in the conversation
  const firstMessage = messageEntries[0];
  // Extract the first prompt from the conversation (implementation of extractUserPromptSummary is external)
  const firstPrompt = extractUserPromptSummary(messageEntries);
  // Parse the timestamp of the first message as a Date object
  const createdDate = new Date(firstMessage.timestamp);
  // Parse the timestamp of the last message as a Date object
  const modifiedDate = new Date(lastMessage.timestamp);

  return {
    date: lastMessage.timestamp, // Timestamp of the last message
    messages: fP4(messageEntries), // Processed messages (implementation of fP4 is external)
    fullPath: "n/a", // Placeholder for full path (not available)
    value: value, // Provided value or default
    created: createdDate, // Date object for when the conversation started
    modified: modifiedDate, // Date object for when the conversation was last modified
    firstPrompt: firstPrompt, // The first prompt in the conversation
    messageCount: messageEntries.length, // Total number of messages
    isSidechain: firstMessage.isSidechain, // Whether the conversation is a sidechain (from first message)
    leafUuid: lastMessage.uuid // UUID of the last message (leaf node)
  };
}

module.exports = buildConversationSummary;