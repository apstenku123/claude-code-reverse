/**
 * Builds a summary object from an array of message entries.
 *
 * @param {Array<Object>} messageEntries - Array of message entry objects, each containing at least 'timestamp', 'uuid', and 'isSidechain' properties.
 * @param {number} [value=0] - Optional value to include in the summary (default is 0).
 * @returns {Object} Summary object containing metadata and aggregated information about the messages.
 */
function buildMessageSummary(messageEntries, value = 0) {
  // The last message entry in the array
  const lastMessage = messageEntries[messageEntries.length - 1];
  // The first message entry in the array
  const firstMessage = messageEntries[0];
  // Derive the first prompt from the message entries (external function)
  const firstPrompt = extractUserPromptSummary(messageEntries);
  // Parse the timestamp of the first message as a Date object
  const createdDate = new Date(firstMessage.timestamp);
  // Parse the timestamp of the last message as a Date object
  const modifiedDate = new Date(lastMessage.timestamp);

  return {
    date: lastMessage.timestamp, // Timestamp of the last message
    messages: fP4(messageEntries), // Aggregated messages (external function)
    fullPath: "n/a", // Placeholder for full path
    value: value, // Provided value
    created: createdDate, // Date of the first message
    modified: modifiedDate, // Date of the last message
    firstPrompt: firstPrompt, // Derived first prompt
    messageCount: messageEntries.length, // Total number of messages
    isSidechain: firstMessage.isSidechain, // Sidechain status from the first message
    leafUuid: lastMessage.uuid // UUID of the last message
  };
}

module.exports = buildMessageSummary;