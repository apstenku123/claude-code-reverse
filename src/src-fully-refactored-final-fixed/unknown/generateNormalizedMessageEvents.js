/**
 * Generates normalized message event objects from a given message event input.
 * Handles 'assistant', 'user', and 'progress' event types, normalizing their structure
 * and yielding them as generator results. Utilizes normalizeMessageEvents to flatten and
 * standardize the message event(createInteractionAccessor), and assigns session IDs using g9().
 *
 * @param {Object} messageEvent - The input message event object to process.
 * @param {string} messageEvent.type - The type of the event ('assistant', 'user', or 'progress').
 * @param {Object} [messageEvent.data] - Additional data for 'progress' events.
 * @param {Object} [messageEvent.data.message] - The message object for 'progress' events.
 * @param {string} [messageEvent.data.type] - The type of the data for 'progress' events.
 * @param {string|null} [messageEvent.parentToolUseID] - The parent tool use updateSnapshotAndNotify, if any.
 * @returns {Generator<Object>} Yields normalized message event objects with standardized structure.
 */
function* generateNormalizedMessageEvents(messageEvent) {
  switch (messageEvent.type) {
    case "assistant": {
      // Normalize and yield all assistant messages
      for (const normalizedEvent of normalizeMessageEvents([messageEvent])) {
        yield {
          type: "assistant",
          message: normalizedEvent.message,
          parent_tool_use_id: null,
          session_id: g9()
        };
      }
      return;
    }
    case "progress": {
      // Only process if the progress data is of type 'agent_progress'
      if (messageEvent.data.type !== "agent_progress") return;
      // Normalize and yield all messages within the progress event
      for (const normalizedEvent of normalizeMessageEvents([messageEvent.data.message])) {
        switch (normalizedEvent.type) {
          case "assistant":
            yield {
              type: "assistant",
              message: normalizedEvent.message,
              parent_tool_use_id: messageEvent.parentToolUseID,
              session_id: g9()
            };
            break;
          case "user":
            yield {
              type: "user",
              message: normalizedEvent.message,
              parent_tool_use_id: messageEvent.parentToolUseID,
              session_id: g9()
            };
            break;
        }
      }
      break;
    }
    case "user": {
      // Normalize and yield all user messages
      for (const normalizedEvent of normalizeMessageEvents([messageEvent])) {
        yield {
          type: "user",
          message: normalizedEvent.message,
          parent_tool_use_id: null,
          session_id: g9()
        };
      }
      return;
    }
    default:
      // No action for unknown types
      break;
  }
}

module.exports = generateNormalizedMessageEvents;