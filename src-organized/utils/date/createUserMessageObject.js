/**
 * Creates a standardized user message object with metadata for further processing.
 *
 * @param {Object} params - Parameters for constructing the user message object.
 * @param {string} params.content - The main content of the user message.
 * @param {boolean} params.isMeta - Indicates if the message is a meta message.
 * @param {boolean} params.isCompactSummary - Indicates if the message is a compact summary.
 * @param {any} params.toolUseResult - Result object from a tool usage, if applicable.
 * @returns {Object} a user message object containing content, metadata, uuid, timestamp, and tool use result.
 */
function createUserMessageObject({
  content,
  isMeta,
  isCompactSummary,
  toolUseResult
}) {
  // Use fallback content if none is provided
  const messageContent = content || eY;

  return {
    type: "user",
    message: {
      role: "user",
      content: messageContent
    },
    isMeta: isMeta,
    isCompactSummary: isCompactSummary,
    uuid: NO(), // Generate a unique identifier for the message
    timestamp: new Date().toISOString(), // Record the creation time in ISO format
    toolUseResult: toolUseResult
  };
}

module.exports = createUserMessageObject;