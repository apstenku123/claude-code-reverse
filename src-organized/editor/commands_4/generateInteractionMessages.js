/**
 * Generates standardized message objects from various interaction event types.
 *
 * Depending on the input event type ('assistant', 'user', or 'progress'),
 * this generator yields message objects with consistent structure, including
 * session IDs and parent tool use IDs where appropriate.
 *
 * @param {Object} interactionEvent - The interaction event object to process.
 * @param {string} interactionEvent.type - The type of the event ('assistant', 'user', or 'progress').
 * @param {Object} [interactionEvent.data] - Additional data for 'progress' events.
 * @param {string} [interactionEvent.parentToolUseID] - Optional parent tool use updateSnapshotAndNotify for 'progress' events.
 * @returns {Generator<Object>} Yields standardized message objects for downstream processing.
 */
function* generateInteractionMessages(interactionEvent) {
  switch (interactionEvent.type) {
    case "assistant": {
      // For 'assistant' events, wrap in array and process with s3
      for (const processedMessage of s3([interactionEvent])) {
        yield {
          type: "assistant",
          message: processedMessage.message,
          parent_tool_use_id: null,
          session_id: g9()
        };
      }
      return;
    }
    case "progress": {
      // Only process if the progress data is of type 'agent_progress'
      if (interactionEvent.data.type !== "agent_progress") return;
      // Process the message inside the progress event
      for (const processedMessage of s3([interactionEvent.data.message])) {
        switch (processedMessage.type) {
          case "assistant":
            yield {
              type: "assistant",
              message: processedMessage.message,
              parent_tool_use_id: interactionEvent.parentToolUseID,
              session_id: g9()
            };
            break;
          case "user":
            yield {
              type: "user",
              message: processedMessage.message,
              parent_tool_use_id: interactionEvent.parentToolUseID,
              session_id: g9()
            };
            break;
        }
      }
      break;
    }
    case "user": {
      // For 'user' events, wrap in array and process with s3
      for (const processedMessage of s3([interactionEvent])) {
        yield {
          type: "user",
          message: processedMessage.message,
          parent_tool_use_id: null,
          session_id: g9()
        };
      }
      return;
    }
    default:
      // normalizeToError nothing for unknown types
      break;
  }
}

module.exports = generateInteractionMessages;