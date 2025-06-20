/**
 * Determines if a given message object represents a valid user message.
 *
 * a message is considered valid if:
 *   - Its type is 'user'
 *   - Its content is not an array whose first element is a tool result
 *   - It does not meet the criteria defined by the isTextMessageWithKnownContent function (e.g., filtered or invalid)
 *   - It is not marked as metadata (isMeta is falsy)
 *
 * @param {Object} messageEntry - The message entry object to validate.
 * @param {string} messageEntry.type - The type of the message (should be 'user').
 * @param {Object} messageEntry.message - The message content object.
 * @param {Array|any} messageEntry.message.content - The content of the message, can be an array or other type.
 * @param {boolean} [messageEntry.isMeta] - Indicates if the message is metadata.
 * @returns {boolean} True if the message is a valid user message, false otherwise.
 */
function isValidUserMessage(messageEntry) {
  // Check if the message type is 'user'
  if (messageEntry.type !== "user") {
    return false;
  }

  // Check if the message content is an array and its first element is a tool result
  if (
    Array.isArray(messageEntry.message.content) &&
    messageEntry.message.content[0]?.type === "tool_result"
  ) {
    return false;
  }

  // Check if the message is filtered or invalid according to isTextMessageWithKnownContent
  if (isTextMessageWithKnownContent(messageEntry)) {
    return false;
  }

  // Check if the message is marked as metadata
  if (messageEntry.isMeta) {
    return false;
  }

  // All checks passed; the message is valid
  return true;
}

module.exports = isValidUserMessage;