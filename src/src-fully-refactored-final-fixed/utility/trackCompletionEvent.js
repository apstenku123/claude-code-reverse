/**
 * Tracks a completion event by sending relevant metadata to the analytics system.
 *
 * @param {string} completionType - The type of completion event (e.g., 'success', 'failure').
 * @param {Object} context - The context object containing assistant message details.
 * @param {Object} context.assistantMessage - The assistant message object.
 * @param {Object} context.assistantMessage.message - The message object containing the message updateSnapshotAndNotify.
 * @param {string} context.assistantMessage.message.id - The unique identifier for the message.
 * @param {string} eventName - The name of the event to track.
 * @returns {void}
 */
function trackCompletionEvent(
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
  // Send the completion event to the analytics system with metadata
  u5({
    completion_type: completionType,
    event: eventName,
    metadata: {
      language_name: "none", // Language is not specified
      message_id: messageId,
      platform: pA.platform // Platform information from global pA object
    }
  });
}

module.exports = trackCompletionEvent;