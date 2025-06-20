/**
 * Generates normalized chat event objects from a given chat message input.
 * Handles different message types (assistant, user, progress) and normalizes them
 * for downstream processing, assigning session IDs and parent tool use IDs as needed.
 *
 * @generator
 * @function generateNormalizedChatEvents
 * @param {Object} chatEvent - The chat event object to process. Must have a 'type' property.
 * @returns {Generator<Object>} Yields normalized chat event objects with standardized structure.
 */
function* generateNormalizedChatEvents(chatEvent) {
  switch (chatEvent.type) {
    case "assistant": {
      // Normalize and yield each assistant message
      for (const normalizedMessage of normalizeChatMessages([chatEvent])) {
        yield {
          type: "assistant",
          message: normalizedMessage.message,
          parent_tool_use_id: null,
          session_id: g9()
        };
      }
      return;
    }
    case "progress": {
      // Only process if the progress data is of type 'agent_progress'
      if (chatEvent.data.type !== "agent_progress") return;
      // Normalize the progress message and yield based on its type
      for (const normalizedMessage of normalizeChatMessages([chatEvent.data.message])) {
        switch (normalizedMessage.type) {
          case "assistant":
            yield {
              type: "assistant",
              message: normalizedMessage.message,
              parent_tool_use_id: chatEvent.parentToolUseID,
              session_id: g9()
            };
            break;
          case "user":
            yield {
              type: "user",
              message: normalizedMessage.message,
              parent_tool_use_id: chatEvent.parentToolUseID,
              session_id: g9()
            };
            break;
        }
      }
      break;
    }
    case "user": {
      // Normalize and yield each user message
      for (const normalizedMessage of normalizeChatMessages([chatEvent])) {
        yield {
          type: "user",
          message: normalizedMessage.message,
          parent_tool_use_id: null,
          session_id: g9()
        };
      }
      return;
    }
    default:
      // normalizeToError nothing for unrecognized types
      break;
  }
}

module.exports = generateNormalizedChatEvents;