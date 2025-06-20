/**
 * Logs a completion event with associated metadata.
 *
 * @param {string} completionType - The type of completion event (e.g., 'success', 'error').
 * @param {Object} context - The context object containing assistant message details.
 * @param {Object} context.assistantMessage - The assistant message object.
 * @param {Object} context.assistantMessage.message - The message object.
 * @param {string} context.assistantMessage.message.id - The unique identifier for the message.
 * @param {string} eventName - The name of the event to log.
 * @returns {void}
 */
function logCompletionEvent(
  completionType,
  {
    assistantMessage: {
      message: {
        id: messageId
      }
    }
  },
  eventName
) {
  // Log the completion event with relevant metadata
  u5({
    completion_type: completionType,
    event: eventName,
    metadata: {
      language_name: "none", // Language is not specified
      message_id: messageId,
      platform: pA.platform // Platform information from external variable
    }
  });
}

module.exports = logCompletionEvent;