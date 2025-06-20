/**
 * Determines if a message of a given type should be allowed based on its properties and context.
 *
 * @param {Object} message - The message object to evaluate. Must have a 'type' property.
 * @param {Object} config - Configuration object used for further validation.
 * @param {Set} processedIds - Set of already processed message IDs.
 * @param {any} context - Additional context for validation (passed to validatePositiveInteger).
 * @param {string} messageTypeOverride - Optional override for message type (e.g., 'transcript').
 * @returns {boolean} - Returns true if the message should be allowed, false otherwise.
 */
function shouldAllowMessageType(message, config, processedIds, context, messageTypeOverride) {
  // If the messageTypeOverride is 'transcript', always allow
  if (messageTypeOverride === "transcript") {
    return true;
  }

  switch (message.type) {
    case "attachment":
      // Always allow attachments
      return true;
    case "user":
    case "assistant": {
      // Get a unique identifier for the message
      const messageId = extractRelevantInteractionId(message);
      // If no identifier, allow by default
      if (!messageId) {
        return true;
      }
      // If this message has already been processed, do not allow
      if (processedIds.has(messageId)) {
        return false;
      }
      // Perform additional validation using getToolUseIdsFromAssistantMessages and validatePositiveInteger
      const validationResult = getToolUseIdsFromAssistantMessages(message, config);
      // Allow only if validatePositiveInteger returns false (i.e., not disallowed)
      return !validatePositiveInteger(validationResult, context);
    }
    case "progress":
      // Never allow progress messages
      return false;
    case "system":
      // Always allow system messages
      return true;
    default:
      // For any unknown type, do not allow
      return false;
  }
}

module.exports = shouldAllowMessageType;